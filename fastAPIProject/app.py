from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import openai, os
import json
from datetime import date

app = Flask(__name__)
load_dotenv('.env')
openai.api_key = os.getenv('GPT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.environ['MARIADB_USER']}:{os.environ['MARIADB_PASSWORD']}@localhost:{os.environ['MARIADB_PORT']}/{os.environ['MARIADB_DATABASE']}"

db = SQLAlchemy(app)

class Diary(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    content = db.Column(db.Text)
    music = db.Column(db.JSON)  # JSON 지원 필드
    created_at = db.Column(db.Date, default=date.today)

    def to_dict(self, include_music=False):
        data = {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat()
        }
        if include_music:
            data['music'] = self.music
        return data

@app.route('/api/diary', methods=['POST'])
def create_diary():
    data = request.get_json()
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Missing data'}), 400
    
    content = data['content']
    gpt_response = get_gpt_response(content)
    print(gpt_response)
    try:
        gpt_response = json.loads(gpt_response)
    except:
        target = '''{
	                "errorType" : "fail",
	                "errorMsg" : "실패"
                 }'''
        return jsonify(json.loads(target))

    new_diary = Diary(
        title=data['title'],
        content=data['content'],
        music=data.get('music', gpt_response),
        created_at=data.get('created_at', date.today())
    )
    db.session.add(new_diary)
    db.session.commit()

    return jsonify({'id': new_diary.id}), 201

@app.route('/api/diary', methods=['GET'])
def get_diaries():
    diaries = Diary.query.all()
    return jsonify([diary.to_dict() for diary in diaries])

@app.route('/api/diary/<int:diary_id>', methods=['GET'])
def get_diary(diary_id):
    diary = Diary.query.get(diary_id)
    if diary:
        return jsonify(diary.to_dict(include_music=True))
    else:
        return jsonify({'error': 'Diary not found'}), 404

messages = []
def get_gpt_response(content):
    messages.append({"role":"user", "content":content})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    chat_response = completion.choices[0].message.content
    return chat_response

@app.before_first_request
def initialize():
    messages.append({"role":"user", "content":
    '''
내가 일기를 주면 너는 일기의 감정을 파악해서 아래와 같은 형식으로 json 형태로 음악을 만들어줘.
{"tracks": [{"notes": [{ "note": 76, "start": 0, "duration": 0.25 }],}, {"notes": [{ "note": [76, 80, 83], "start": 0, "duration": 0.75 ],},],}
내가 앞으로 뭘 보내던 너는 무조건 위와 같은 json형식으로 줘 다른 말 붙히지마 절대.
일기를 보내면 너는 json으로만 답해. 위와 같은 형식으로.
음악의 길이는 8초로 해.
참고로 node 60은 C, 61은 C#, 62는 B야. 1은 1초야. 참고해서 감정에 따른 음악 만들어줘.
감정이 우울하다고 판단하면 단조, 기쁘면 단조 이렇게.
화음, 멜로디를 나눠서. 악기는 피아노야.
    '''})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    chat_response = completion.choices[0].message.content
    messages.append({"role":"assistant", "content": chat_response})
    print("setting complete!")
    return chat_response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555)