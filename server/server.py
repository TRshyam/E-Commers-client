from flask import Flask, jsonify,request,url_for
from flask_cors import CORS
import json
import pymongo
from pymongo.mongo_client import MongoClient
from bson import ObjectId
from flask_mail import Mail, Message
import secrets
from bcrypt import hashpw, gensalt, checkpw
import datetime
import hashlib
import time
import os


# from pymongo.server_api import ServerApi


# uri = "mongodb+srv://trshyam0007:jVYxhlu3PNxwPrD1@cluster0.cmcdubi.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient('localhost', 27017)


app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Set your SMTP server
app.config['MAIL_PORT'] = 587  # Set your SMTP port
app.config['MAIL_USE_TLS'] = True  # Enable TLS
app.config['MAIL_USERNAME'] = 't.r.shyam0007@gmail.com'  # Set your email username
app.config['MAIL_PASSWORD'] = 'qakr qnca qygs hoij'  # Set your email password
app.config['MAIL_DEFAULT_SENDER'] = 't.r.shyam0007@gmail.com'  # Set your default sender

app.config['SECRET_KEY'] = '12345'

mail = Mail(app)

CORS(app, origins='http://localhost:5173', methods=['POST'])

client = MongoClient('localhost', 27017)
db = client['users-e-com']
carts_collection = db['carts']

@app.route('/api/data', methods=['GET'])
def get_data():
    with open('server\DatabaseSchema.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

@app.route('/api/data/retrive_product', methods=['POST'])
def retrieve_product():
    try:
        data = request.json
        product_id = data.get('ProductId')
        print("product_id", product_id)

        if not product_id:
            return jsonify({'error': 'Missing ProductId in request body'}), 400  # Bad request

        # Load product data from JSON file (assuming 'details' is a dictionary within each product)
        with open('server\DatabaseSchema.json', 'r') as file:
            products = json.load(file)

        # Find the product with the matching ID
        product = None
        for prod_id, product_value in products.items():
            if product_value["id"] == product_id:
                product =  product_value
                break

        print("product : ", product['details']['Specialprize'])

        if product:
            return jsonify(product)

        else:
            return jsonify({'error': 'Product not found'}), 404  # Not found

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500  # Internal server error



@app.route('/api/productsDB', methods=['GET'])
def get_products():
    with open('server/products_db.json', 'r') as file:
        data = json.load(file)
  
    return jsonify(data)


def generate_confirmation_token():
    return secrets.token_urlsafe(16)


def send_confirmation_email(email, confirmation_token):
    # confirmation_url = url_for('signup', token=confirmation_token, _external=True)
    msg = Message('Confirmation Email', recipients=[email])
    msg.body = f'Thank you for signing up!! Please click the following link to confirm your email: {confirmation_token}'
    mail.send(msg)





@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    phNumber=data.get('phNumber')
    print(data)
    print(phNumber)
    print(phNumber)
    print(phNumber)
    print("Signing up user...")

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        # Assuming you have a database named 'users' and a collection named 'accounts'
        db = client['users-e-com']
        collection = db['accounts']

        existing_user = collection.find_one({'email': email})
        if existing_user:
            print("Email already exists in the database.")
            return  'User Already exists', 400  # Return a 400 Bad Request status
        
        
        # Generate unique user ID with "abrt" prefix
        user_id = "eabrt" + str(ObjectId())

        # confirmation_token = generate_confirmation_token()
        
        
        # Insert user data into the collection
        user_data = {
            '_id': user_id,
            'firstName':firstName,
            'lastName':lastName,
            'phnumber':phNumber,
            'email': email,
            'password': hashpw(password.encode('utf-8'), gensalt()),
            'address':[[],[]],
            'confirmed': False,  # Mark the user as unconfirmed initially
            # 'confirmation_token': confirmation_token
        }
        result = collection.insert_one(user_data)
        print("User signed up successfully. Inserted ID:", user_id)
        # print(email)
        # send_confirmation_email(email, confirmation_token)
        print("mail Send")
        return "True"

    except Exception as e:
        print(e)
        return "False"

    # Process the received data (e.g., save it to a database)

    return jsonify({'message': 'User signed up successfully'})



@app.route('/api/update-user/<string:user_id>', methods=['POST'])
def update_user(user_id):
    data = request.json
    new_firstName = data.get('firstName')
    new_lastName = data.get('lastName')
    new_email = data.get('email')
    new_password = data.get('password')
    new_address = data.get('address')
    new_zipcode = data.get('zipcode')
    new_phNumber = data.get('phoneNumber')
    
    print("Updating user...")
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        db = client['users-e-com']
        collection = db['accounts']

        existing_user = collection.find_one({'_id': user_id})
        if not existing_user:
            print("User not found.")
            return jsonify({'success': 'False', 'message': 'User not found'})

        # Construct update data dictionary with only provided fields
        update_data = {}
        if new_email:
            update_data['email'] = new_email
        if new_password:
            update_data['password'] = hashpw(new_password.encode('utf-8'), gensalt())
        if new_phNumber:
            update_data['phnumber'] = new_phNumber
        if new_firstName:
            update_data['firstName'] = new_firstName
        if new_lastName:
            update_data['lastName'] = new_lastName
        if new_address:
            # If address is provided, update the address field in array format
            update_data['address'] = existing_user.get('address', [])
            if new_zipcode:
                # If new zipcode is provided, update the existing zipcode
                update_data['address'][1] = new_zipcode
            if new_address:
                # If new address is provided, update the existing address
                update_data['address'][0] = new_address
        # Add other fields as needed

        if not update_data:
            print("No update data provided.")
            return jsonify({'success': "False", 'message': 'No update data provided'})

        # Perform the update operation using $set operator
        collection.update_one({'_id': user_id}, {'$set': update_data})
        print("User updated successfully.")

        # Fetch the updated user document from the database
        updated_user = collection.find_one({'_id': user_id})
        updated_user.pop('password', None)

        # print("++++++")
        # print(A)
        # print(A)
        # print(A)
        # print(A)

        return jsonify({'success': "True", 'message': 'User updated successfully', 'user': updated_user})

    except Exception as e:
        print(e)
        return jsonify({'success': "False", 'message': 'An error occurred while updating the user.'}),404


@app.route('/api/signin', methods=["POST"])
def signin():
    data = request.json
    email=data.get('email')
    password=data.get('password')
    # password="password"
    print(email)
    print(password)
    
    db = client['users-e-com']
    collection = db['accounts']
    user =collection.find_one({'email': email})
    print(user)
    
    if user and user.get('password'):  # Check if user exists and has password
        if checkpw(password.encode('utf-8'), user['password']):
            user_data = {key: value for key, value in user.items() if key != 'password'}  # Use secure password hashing
            return jsonify({'user': user_data}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404
    
@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Assuming the request includes a JSON body with userId and productId
        data = request.json
        print(data)
        userId = data.get('userId')
        productId = data.get('productId')
        quantity = data.get('quantity')
        print("quantity : ",quantity)

        # Connect to the MongoDB and add the product to the user's cart
        db = client['users-e-com']
        collection = db['carts']

        # Check if the user's cart already exists
        user_cart = collection.find_one({'_id': userId})

        if user_cart:
            # Check if the product is already in the cart
            if any(item['productId'] == productId for item in user_cart['products']):
                # Update existing cart with new quantity for the product
                collection.update_one(
                    {'_id': userId, 'products.productId': productId},  # Find by userId and matching productId
                    {'$set': {'products.$.quantity': quantity}}  # Update quantity using $inc and positional operator
                )
                print(f"Product {productId} quantity updated in cart for user {userId}")
                updated_cart = collection.find_one({'_id': userId})
                if updated_cart:
                    print("Product already exists in the cart for user:", userId)
                    return jsonify(updated_cart['products'])
                print("Product already exists in the cart for user:", userId)
                return "Product already exists in the cart."
            
            # Update the existing cart with the new product
            collection.update_one(
                {'_id': userId},
                {'$addToSet': {'products': {'productId' : productId ,'quantity' : quantity}}}
            )
            print("Product added to cart for user:", userId)
        else:
            # Create a new cart for the user and add the product
            cart_data = {
            '_id': userId,
            'products': [{'productId': productId, 'quantity': quantity}]
            }
            collection.insert_one(cart_data)
            print("New cart created and product added for user:", userId)

        # Retrieve and return the updated cart
        updated_cart = collection.find_one({'_id': userId})
        if updated_cart:
            return jsonify(updated_cart['products'])
        else:
            return "Cart is empty."

    except Exception as e:
        print(e)
        return "Failed to add product to cart."
    
@app.route('/api/cart/delete', methods=['POST'])
def remove_from_cart():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        data = request.json
        userId = data.get('userId')
        productId = data.get('productId')
        print(productId , userId)

        db = client['users-e-com']
        collection = db['carts']

        user_cart = collection.find_one({'userId': userId})

        if not user_cart:
            return "User cart not found."
        print("productId",productId)
        if any(item['productId'] == productId for item in user_cart['products']):
            

            collection.update_one(
                {'userId': userId, 'products.productId': productId},
                {'$pull': {'products': {'productId': productId}}}  # Use $pull to remove product
            )

            updated_cart = collection.find_one({'userId': userId})
            if updated_cart:
                return jsonify(updated_cart['products'])
            else:
                return "An error occurred while removing the product."  # More generic error
        return "Product not found in the cart."

    except Exception as e:
        print(e)
        return "Failed to remove product from cart."
    
    
    
def cart_reset(userId):
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        db = client['users-e-com']
        collection = db['carts']

        # Find the user's cart
        user_cart = collection.find_one({'userId': userId})

        if user_cart:
            # Update the cart to reset products to an empty list
            collection.update_one({'userId': userId}, {'$set': {'products': []}})
            print("Cart products reset successfully for user:", userId)
            return "Cart products reset successfully."
        else:
            return "Cart not found for the user."

    except Exception as e:
        print(e)
        return "Failed to reset cart products."


    
# Endpoint to retrieve products in the cart for a specific user
@app.route('/api/cart/<userId>', methods=['GET'])
def get_cart(userId):
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Connect to MongoDB and retrieve the user's cart
        db = client['users-e-com']
        collection = db['carts']

        user_cart = collection.find_one({'userId': userId})

        if user_cart:
            return jsonify(user_cart['products'])
        else:
            return "Cart is empty."

    except Exception as e:
        print(e)
        return "Failed to retrieve cart."
    
    
@app.route('/api/wishlist/modify', methods=['POST'])
def modify_wishlist():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        data = request.json
        userId = data.get('userId')
        productId = data.get('productId')   

        db = client['users-e-com']
        collection = db['whishlist']
        
        wishlist = collection.find_one({'userId': userId})

        if wishlist:
            products = wishlist.get('products', [])
            if productId in products:
                products.remove(productId)
            else:
                products.append(productId)
            collection.update_one({'userId': userId}, {'$set': {'products': products}})
        else:
            collection.insert_one({'userId': userId, 'products': [productId]})
            products = [productId]  # New wishlist created, so products list has only the new productId
        
        return jsonify({'products': products})
    
    except Exception as e:
        print(e)
        return "Failed."
    
@app.route('/api/wishlist/<userId>', methods=['GET'])
def view_wishlist(userId):
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Connect to MongoDB and retrieve the user's cart
        db = client['users-e-com']
        collection = db['wishlist']

        user_cart = collection.find_one({'userId': userId})

        if user_cart:
            return jsonify(user_cart['products'])
        else:
            return "Wishlist is empty."

    except Exception as e:
        print(e)
        return "Failed to retrieve cart."
    
@app.route('/api/orders/add', methods=['POST'])
def add_order():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Assuming the request includes a JSON body with userId and productId
        data = request.json
        userId = data.get('userId')
        products = data.get('products') # inn the format { [productId, quantity] , [productId, quantity] .....}
        amount = data.get('totalSum')
        order_id = "order" + str(ObjectId())
        now = datetime.datetime.now()
        
        print("userId",userId)
        print("products",products)
        print("order_id ",order_id) 

        db = client['users-e-com']
        collection_orders = db['orders']

        orders = {
            'userId': userId,
            'orderId' : order_id,
            'products': products,
            'dateAndTime' : now,
            'amount' : amount
            }
        
        collection_orders.insert_one(orders)
        
        
        collection_accounts = db['accounts'] 
        
        account_filter = {'_id': userId}
        account = collection_accounts.find_one(account_filter)

        if account:
            account['orders'].append(order_id)
            collection_accounts.replace_one(account_filter, account)
            cart_reset(userId)
            return "true"
        else:
            print(f"Failed to find user account with ID: {userId}")
            return "false"
        
        

    except Exception as e:
        print(e)
        return "Failed to order"


@app.route('/api/orders/retrieve', methods=['POST'])
def retrieve_orders():
    try:
        # Assuming the request includes a JSON body with userId
        data = request.json
        userId = data.get('userId')

        if not userId:
            return jsonify({'error': 'Missing userId in request body'}), 400  # Bad request

        # Connect to MongoDB (replace with your connection logic)
        client.admin.command('ping')
        db = client['users-e-com']
        collection_accounts = db['accounts']

        # Find the user account with the matching userId
        account_filter = {'_id': userId}
        account = collection_accounts.find_one(account_filter)
        print(account)

        if account:
            # Check if the account has an 'Orders' array
            orders = account.get('orders', [])  # Return empty list if 'orders' is missing
            
            orderDetails = []
            amountsAndTimes = []
            for orderId in orders:
                retrived = retrieve_products(orderId)
                if retrived and retrived[0]:
                    orderDetails.append(retrived[0])
                    amountsAndTimes.append(retrived[1:])
            print(orderDetails)
            print(amountsAndTimes)
            return jsonify({'orders' : orderDetails , 'AmountsAndTimes' : amountsAndTimes})  
        else:
            return jsonify({'error': 'User account not found'}), 404  # Not found

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500  # Internal server error
    
def retrieve_products(orderId):
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Connect to MongoDB and retrieve the user's cart
        db = client['users-e-com']
        collection = db['orders']

        order = collection.find_one({'orderId': orderId})

        if order:
            return [order['products'] , order['amount'],order['dateAndTime']]

    except Exception as e:
        print(e)
        return "Failed to retrieve order."

def generate_unique_id():
    timestamp = str(int(time.time()))  # Get current timestamp
    unique_id = hashlib.sha256(timestamp.encode()).hexdigest()[:10]  # Get the SHA-256 hash and take the first 10 characters
    return unique_id

# Generate 10 unique IDs




@app.route('/api/add_product', methods=['POST'])
def add_product():
    # Access form data from request body
    _id = "pd" + generate_unique_id()
    product_name = request.form.get('productName')
    category = request.form.get('category')
    images = request.files.getlist('images')  # Handle file uploads
    highlights = request.form.get('highlights')
    description = request.form.get('description')
    specifications = request.form.get('specifications')
    
    # save the images 
    img_dir = os.path.join('server/static', 'imgs')
    if not os.path.exists(img_dir):
        os.makedirs(img_dir)

    image_filenames = []
    for image in images:
        filename = f"{_id}_{image.filename}"  
        image.save(os.path.join(img_dir, filename))
        image_filenames.append(filename)

    # Create a dictionary 
    product_data = {
        '_id': _id,
        'productName': product_name,
        'category': category,
        'images': image_filenames,  
        'highlights': highlights,
        'description': description,
        'specifications': specifications
    }

    # directory to save JSON file
    directory = "server/Modules"
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Load the JSON file
    json_file = os.path.join(directory, "products.json")
    if os.path.exists(json_file):
        with open(json_file, 'r') as file:
            data = json.load(file)
    else:
        data = {"product_data": {}}

    # Add to the respective category
    data["product_data"].setdefault(category, {})[_id] = product_data

    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

    # Return a success message
    return jsonify({'message': 'Data received successfully and saved to JSON file'})



if __name__ == '__main__':
    app.run(debug=True)