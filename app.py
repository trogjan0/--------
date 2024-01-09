from flask import Flask, render_template, redirect, request, url_for
import psycopg2

y = 1

app = Flask(__name__)
def connection():
    con = psycopg2.connect(database="wear_shop",
                           user="postgres",
                           password="1488",
                           host="localhost", port="5432")
    return con


@app.route('/')
@app.route('/index.html')
def index():
    conn = connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM wear")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', enemy = rows)

@app.route("/wear.html")
def wear():
    conn = connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM wear")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('wear.html', rows = rows)

@app.route('/create', methods=['POST'])
def create():
    conn = connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM clients ORDER BY id')
    name = request.form['name']
    comm = request.form['comm']
    number = request.form['number']
    client_ids = cur.fetchall()
    id = 1
    if(client_ids != []):
        client_id = client_ids[len(client_ids) - 1]
        id = client_id[0] + 1
    cur.execute('SELECT id FROM orders ORDER BY id')
    ordertemp = cur.fetchall()
    order_id = 1
    if(ordertemp != []):
        tenp = ordertemp[len(ordertemp) - 1]
        order_id = tenp[0] + 1
    if(name or comm or number != ""):
        cur.execute('''INSERT INTO clients \
                (id, name, number, comm) VALUES (%s, %s, %s, %s)''',(id, name, number, comm,))
        cur.execute('SELECT wear_id FROM order_tenp ORDER BY id')
        wear_ids = cur.fetchall()
        for i in wear_ids:
            cur.execute('''INSERT INTO orders (id, id_wear, id_client, comm)\
                        VALUES (%s, %s, %s, %s)''', (order_id, i, id, comm))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('cart'))

@app.route('/insert', methods=['POST'])
def insert():
    conn = connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM order_tenp ORDER BY id')
    temps = cur.fetchall()
    x = 1
    if(temps != []):
        temp = temps[len(temps) - 1]
        x = temp[0] + 1
    id = int(request.form['id'])
    cur.execute('''INSERT INTO order_tenp \
                (id, wear_id) VALUES (%s, %s)''',(x, id,))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('cart'))

@app.route('/delete', methods=['POST'])
def delete():
    conn = connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM order_tenp')
    conn.commit()
    cur.close()
    conn.close()
    return render_template('cart.html')

@app.route("/about_us.html")
def about_us():
    return render_template('about_us.html')

@app.route("/contacts.html")
def contacts():
    return render_template('contacts.html')

@app.route("/eror.html")
def eror():
    return render_template('eror.html')

@app.route("/cart.html")
def cart():
    conn = connection()
    cur = conn.cursor()
    cur.execute("SELECT w.model, w.pic, w.price\
                 FROM wear w \
                 JOIN order_tenp ot ON w.id = ot.wear_id;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('cart.html', rows = rows)

@app.route("/shoes.html")
def shoes():
    conn = connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM wear")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('shoes.html', rows = rows)

if __name__ == '__main__':
    app.run(debug=True)

