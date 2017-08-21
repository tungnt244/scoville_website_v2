import requests
import unittest
from faker import Factory


faker = Factory.create()
############ Faker a user ############
email = faker.email()
password = faker.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
user_data= {'Email':email,'Password':password}

def test_get_user():

	############ Create a new valid user ############
	post_resp = requests.post("http://localhost:4444/users",data=user_data)

	############ Check if a new user valid ############
	# print(post_resp.content)
	get_resp =requests.get("http://localhost:4444/users/22")
	return get_resp


class Mytest(unittest.TestCase):
	def testGetUser(self):
		self.assertEqual(200,test_get_user().status_code)

		# self.assertEqual(user_data,test_get_user().content)

if __name__ == '__main__':
    unittest.main()