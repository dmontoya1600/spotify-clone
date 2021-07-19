from flask import url_for, redirect, render_template
from flask_wtf import FlaskForm
from flask_wtf.file import FileField


class UploadFile(FlaskForm):
    file = FileField()
