from flask import Blueprint, jsonify
import random
from api.secrets import getBearerToken
from twarc.client2 import Twarc2
import json

twitterApi = Blueprint("twitterApi", __name__, url_prefix="/twitter_api")
t = Twarc2(bearer_token=getBearerToken())
    

@twitterApi.route('/get_tweet/<username>')
def get_tweet(username):
    user_id = get_user_id(username)
    tweets = get_tweets(user_id)
    return jsonify(random.choice(tweets))


def get_user_id(username=None):
    if not username:
        username = "Kickem_Doordown"
    users_response = t.user_lookup([username], usernames=True)
    for users_page in users_response:
        user_array = users_page['data']
        for user in user_array:
            return user['id']


def get_tweets(user_id):
    tweets = []
    tweets_response = t.timeline(user=user_id, exclude_retweets=True, exclude_replies=True, max_results=100)
    for tweets_page in tweets_response:
        tweet_array = tweets_page['data']
        for tweet in tweet_array:
            tweet_dict = {
                'text': tweet['text'], 
                'favorites': tweet['public_metrics']['like_count'], 
                'retweets': tweet['public_metrics']['retweet_count']
                }
            tweets.append(tweet_dict)
    return tweets
