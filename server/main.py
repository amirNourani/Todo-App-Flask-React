from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__, static_folder="./", static_url_path="/")

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy()

db.init_app(app)

ma = Marshmallow(app)


# database model
class Task(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String(250))
    body: str = db.Column(db.Text)
    date: datetime = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


# model schema
class TaskSchema(ma.Schema):
    class Meta:
        fields = ["id", "title", "body", "date"]


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


@app.route("/")
def index():
    return app.send_static_file("templates/index.html")


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = db.session.query(Task).all()
    result = tasks_schema.dump(tasks)
    return jsonify(result)


@app.route("/tasks/<id>", methods=["GET"])
def task_detail(id: int):
    task = db.session.get(Task, id) or None
    print(task)
    if task is None:
        return {"message": "task not found."}
    else:
        return task_schema.jsonify(task)


@app.route("/add", methods=["POST"])
def add_task():
    title = request.json["title"] or None
    body = request.json["body"] or None

    if title is not None:
        task = Task(title, body)
        db.session.add(task)
        db.session.commit()
        return task_schema.jsonify(task)
    else:
        return {"message": "Title can not be empty"}


@app.route("/tasks/<id>/update", methods=["PUT"])
def udpate_task(id: int):
    task = db.session.get(Task, id) or None
    if not task:
        return {"message": "task not found"}
    else:
        title = request.json["title"]
        body = request.json["body"]
        task.title = title
        task.body = body
        db.session.commit()
        return task_schema.jsonify(task)


@app.route("/tasks/<id>/delete", methods=["DELETE"])
def delete_task(id: int):
    task = db.session.get(Task, id) or None
    if not task:
        return {"message": "task not found"}
    else:
        db.session.delete(task)
        db.session.commit()
        return {"message": "task removed successfully"}


if __name__ == "__main__":
    app.app_context().push()
    db.create_all()
    app.run()
