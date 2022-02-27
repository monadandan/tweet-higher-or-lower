from secrets import getBearerToken
from twarc.client2 import Twarc2
import json

t = Twarc2(bearer_token=getBearerToken())
usernames = ["Kickem_Doordown", "PepperShastaMD", "BrickInTheWaltz", "Parker_Mak", "LardMarge"]
users_response = t.user_lookup(usernames, usernames=True)
print("USERS")
user_ids = []
for users_page in users_response:
    # print(json.dumps(users, indent=4))
    user_array = users_page['data']
    for user in user_array:
        user_ids.append(user['id'])
    # user_ids.append(user.id)
print(user_ids)

tweets = []
for user_id in user_ids:
    tweets_response = t.timeline(user=user_id, exclude_retweets=True, exclude_replies=True, max_results=100)
    for tweets_page in tweets_response:
        tweet_array = tweets_page['data']
        for tweet in tweet_array:
            tweet_tuple = (tweet['text'], tweet['public_metrics']['like_count'], tweet['public_metrics']['retweet_count'])
            tweets.append(tweet_tuple)

print("\n".join(str(tup) for tup in tweets))


'''tweets = t.tweet_lookup(tweet_ids=["1484571486170058761"], tweet_fields="public_metrics")
for tweet in tweets:
    print(json.dumps(tweet, indent=4))
    print("")
'''

'''import tweepy

client = tweepy.Client(bearer_token="AAAAAAAAAAAAAAAAAAAAADvMZgEAAAAAnM42xMXGTTTSaCUjZ6NQx7Dky4E%3DKGmM743UM4T7ylwQ053pwnEEhzZE0HPI2jchsDotlUJbNWPdg7")

username = "Kickem_Doordown"
user = client.get_user(username=username)

user_id = user.data.id
print(f"User id for {username} is {user_id}")

tweets = client.get_users_tweets(id=user_id, tweet_fields="public_metrics")
print(tweets)
print()
print(dir(tweets))

tweet = client.get_tweet(id="1484652784586825744", tweet_fields="public_metrics")
print(tweet)
print(dir(tweet))
'''