## DOKUMENTASI INSTALASI
Ikuti langkah-langkah berikut untuk install aplikasi ke Perangkat Anda.
Jika ada yang kurang mengerti bisa menghubungi develover pada email `ekosaputra.t.i@gmail.com`

## 1. Instalasi Database
1. Install Database `MySQL` (jika database belum terinstall)
2. Import database yang ada pada folder `./docs` dengan nama file `rolling_glory.sql`

## 2. Instalasi Aplikasi
1. Clone project
2. Setting config database `username, password` dan `database` sesuai dengan settingan pada **point 1**. file config bisa dibuka pada folder `./src/config/database.js`
3. Lakukan perintah `yarn install` atau `npm install`
4. Lakukan perintah `yarn start` atau `yarn dev` untuk menjalakan aplikasi

## 3. Library 
* [jsonwebtoken](https://yarnpkg.com/package/jsonwebtoken) - Generate JWT 
* [bcrypt](https://yarnpkg.com/package/bcrypt) - Generate string password
* [Sequelize](https://yarnpkg.com/package/sequelize) - Query Builder
* [ExpressJs](https://expressjs.com/en/starter/installing.html) - Framework REST API
* [bodyParser](https://yarnpkg.com/package/body-parser) - Mengambil data dari form pada framework Express
* [MySQL](https://www.mysql.com/) - Database MySQL2

## 4. EndPoint

**Note : Type Header authorization  yang dipakai adalah Baerer Token**

url| method | Body | Params | Querystring | Penjelasan
:---:| :---:| :---:| :---:| :---:| :---:
`/login`| POST | `{"username": "username Anda","password": "password Anda"}` | - | - | Login Untuk Mendapatkan Baerer Token 
`/gifts`|GET| - | `?q=a&&page=1&&limit=20&&sortingby=asc&&kriteria=created_at` | - | Mendapatkan data gift sesuai dengan query yang di minta
`/gifts`|GET| - | - | `/:id` | Mendapatkan data gifts pada id tertentu
`/gifts`|POST| [Object](#object-post-gifts) | - | - | menambah data gift
`/gifts`|PUT| [Object](#object-put-gifts) | - | `/:id` | Mengubah /Update data gift pada id tertentu
`/gifts`|DELETE| - | - | `/:id_gifts` | Menghapus data gift
`/gifts/:id/redeem `|POST| [Array - Object](#object-post-gifts) | - | `/:id` | Melakukan reedem pada gift
`/gifts/:id/rating `|POST| [Object](#object-post-redeem) | - | `/:id` | Memeberi rating pada gift tertentu dengan syarat user yang memberikan rating harus sudah melakukan redeem
`/gifts/stok `|POST| [Array - Object](#object-post-redeem) | - | `/:id` | Menambah stok gift
`/users`|GET| - | `?q=a&&page=1&&limit=20&&sortingby=asc&&kriteria=created_at` | - | Mendapatkan data user sesuai dengan query yang di minta
`/users`|GET| - | - | `/:id` | Mendapatkan data users pada id tertentu
`/users`|POST| [Object](#object-post-users) | - | - | menambah data user
`/users`|PUT| [Object](#object-put-users) | - | `/:id` | Mengubah /Update data user pada id tertentu
`/users`|DELETE| - | - | `/:id_users` | Menghapus data user

## Referensi
---
### Object POST Gift
```
{
    "name": "Nama gift",
    "description": "deskripsi ",
    "poins": 130000,
    "hot_item": 0,
    "new": 0,
    "best_seller": 0,
    "available": 1
}
```
### Object PUT Gift
```
{
    "name": "Nama gift",
    "description": "deskripsi ",
    "poins": 130000,
    "hot_item": 0,
    "new": 0,
    "best_seller": 0,
    "available": 1
}
```
### Array Object Redeem
```
{
    "redeem": {
        "redeem_code": "A-XX124",
        "quantity_total": 2,
        "poin_total": 30000
    },
    "redeemDetails": [    
        {
            "gift_id": 6,
            "quantity": 4,
            "poins": 10000
        },
        {
            "gift_id": 5,
            "quantity": 3,
            "poins": 20000
        }
    ]
}
```

### Object Rating
```
{
    "gift_id": 6,
    "redeem_detail_id": 19,
    "rating": 4
}
```

### Array Object Stok
```
[
    {
        "gift_id":6,
        "quantity":10
    },
    {
        "gift_id":5,
        "quantity":10
    },
    {
        "gift_id":9,
        "quantity":10
    }
]
```