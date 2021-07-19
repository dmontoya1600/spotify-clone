from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import UploadFile
import logging
import boto3
from botocore.exceptions import ClientError



upload_pic_routes = Blueprint('upload', __name__)

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True


def create_presigned_post(bucket_name, object_name,
                          fields=None, conditions=None, expiration=3600):
    """Generate a presigned URL S3 POST request to upload a file

    :param bucket_name: string
    :param object_name: string
    :param fields: Dictionary of prefilled form fields
    :param conditions: List of conditions to include in the policy
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Dictionary with the following keys:
        url: URL to post to
        fields: Dictionary of form fields and values to submit with the POST
    :return: None if error.
    """

    # Generate a presigned S3 POST URL
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                     object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL and required fields
    return response


@upload_pic_routes.route('/testrun', methods=['POST'])
def upload_profile_pic():
    form = UploadFile()
    s3 = boto3.client('s3')
    if request.files:
        file_data = request.files['image']
        s3.upload_fileobj(file_data, 'spotify-clone-project', file_data.filename,
                            ExtraArgs={
                                'ACL': 'public-read',
                                'ContentType': file_data.content_type
                            })
        response = create_presigned_post('spotify-clone-project', 'test_file')
        print(f'THIS IS THE RESPONSE {response}')
        # FINISHED SETTING UP AWS. STILL NEED TO MAKE A LITTLE MORE DYNAMIC
        return response
