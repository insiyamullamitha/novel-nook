from flask import Flask

app = Flask(__name__)

@app.route('/users')
def users():
    return {"users": ["user1", "user2", "user3"]}

if __name__ == '__main__':
    app.run(debug=True)