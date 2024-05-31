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

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'music': self.music,
            'created_at': self.created_at.isoformat()
        }

@app.route('/api/diary', methods=['POST'])
def create_diary():
    data = request.get_json()
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_diary = Diary(
        title=data['title'],
        content=data['content'],
        music=data.get('music', {}),  # JSON 필드가 선택적이므로 기본값을 비어 있는 객체로 설정
        created_at=data.get('created_at', date.today())  # 날짜가 제공되지 않은 경우 오늘 날짜 사용
    )
    db.session.add(new_diary)
    db.session.commit()

    return jsonify({'id': new_diary.id}), 201

# messages = []
# def get_gpt_response(keyword, number):
#     keyword = f'아까 예시대로 퀴즈를 만들어줘. 배열값만 반환해줘. answer는 아까 말한대로 boolean 값으로 넣어줘. 주제: {keyword}, 문제의 수: {number}'
#     messages.append({"role":"user", "content":keyword})
#     completion = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=messages
#     )
#     chat_response = completion.choices[0].message.content
#     return chat_response

@app.before_first_request
def initialize():
    # messages.append({"role":"user", "content":
    # '''
    #     내가 주제에 대해서 알려주면 해당 주제에 대한 퀴즈 만들어줘.
    #     문제의 형식은 OX 퀴즈이고 아래와 같은 JSON 형식으로 만들고,
    #     answer는 question의 정답이 O 이면 true, X면 false로 해줘.
    #     나중에 퀴즈를 만들 때 다른 텍스트를 줄 필요가 없고, 아래 예시처럼 배열 값만 반환해줘.
    #     예시
    #     [
    #         {
    #             "question": "임진왜란은 1592년에 발발했다.",
    #             "answer": true
    #         },
    #         {
    #             "question": "임진왜란은 1598년에 발발했다.",
    #             "answer": false
    #         }
    #     ]
    # '''})
    # completion = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages
    # )
    # chat_response = completion.choices[0].message.content
    # messages.append({"role":"assistant", "content": chat_response})
    print("setting complete!")
    return ""# chat_response

# @app.route('/api/quiz', methods=['POST'])
# def chat():
#     keyword = request.json['keyword']
#     number = request.json['number']
#     gpt_response = get_gpt_response(keyword, number)
#     print(gpt_response)
#     try:
#         idx = gpt_response.find('[')
#         target = gpt_response[idx:]
#         return jsonify(json.loads(target))
#     except:
#         target = '''{
# 	                "errorType" : "fail",
# 	                "errorMsg" : "질문 생성 실패"
#                  }'''
#         return jsonify(json.loads(target))
        

# @app.route('/api/quiz/custom', methods=['POST'])
# def save_data():
#     data = request.json

#     # Quiz 생성
#     quiz = Quiz()
#     db.session.add(quiz)
#     db.session.commit()

#     # 각 Question을 생성하여 Quiz에 연결
#     for item in data:
#         question = Question(quiz_id=quiz.id, text=item['question'], answer=item['answer'])
#         db.session.add(question)

#     db.session.commit()

#     return jsonify({"quiz_id": quiz.id})  # Quiz의 ID를 반환합니다

# @app.route('/api/quiz', methods=['GET'])
# def get_questions():
#     quiz_id = request.args.get('id')  # query string에서 quiz_id 값을 가져옵니다
#     if not quiz_id:
#         return 'quiz_id parameter is required', 400

#     questions = Question.query.filter_by(quiz_id=quiz_id).all()
#     question_list = [
#         {"question": question.text, "answer": question.answer}
#         for question in questions
#     ]
#     return jsonify(question_list)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555)