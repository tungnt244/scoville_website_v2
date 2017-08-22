import requests
import unittest
from faker import Factory

def test_get_user():
	faker = Factory.create()
	############ Faker a user ############
	email = faker.email()
	password = faker.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
	user_data= {'Email':email,'Password':password}
	############ Create a new valid user ############
	post_resp = requests.post("http://localhost:4444/users",data=user_data)
	user_id = post_resp.json()[0]
	############ Check if a new user valid ############
	
	get_resp =requests.get("http://localhost:4444/users/"+user_id)

	return get_resp


def test_login_user():
	faker = Factory.create()
	############ Faker a user ############
	email = faker.email()
	password = faker.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
	user_data= {'Email':email,'Password':password}
	############ Create a new valid user ############
	post_resp = requests.post("http://localhost:4444/users",data=user_data)
	user_id = post_resp.json()[0]
	############ Check if a new user valid ############
	get_resp =requests.get("http://localhost:4444/users/"+user_id)
	user_info =  {'Email':get_resp.json()['email'],'Password':user_data['Password']}
	login_resp = requests.post("http://localhost:4444/login",data=user_info)

	return login_resp

def test_get_all_user():
	faker = Factory.create()
	############ Faker a user ############
	email = faker.email()
	password = faker.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
	user_data= {'Email':email,'Password':password}
	############ Create a new valid user ############
	post_resp = requests.post("http://localhost:4444/users",data=user_data)
	user_id = post_resp.json()[0]

	get_resp = requests.get("http://localhost:4444/users/"+user_id)
	new_user_in_database = get_resp.json()

	get_resp_1 = requests.get("http://localhost:4444/users")
	all_user=get_resp_1.json()

	if (new_user_in_database in all_user):
		return True
	else:
		return False



class Mytest(unittest.TestCase):
	def testGetUser(self):
		self.assertEqual(200,test_get_user().status_code)
	def test_login_user(self):
		self.assertEqual(200,test_login_user().status_code)
	def test_login_user(self):
		self.True(test_get_all_user)

if __name__ == '__main__':
    unittest.main()