// Tạo 1 ứng dụng express cơ bản
const express= require('express');
const app = express();
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");


//  Ẩn những file mình làm
require("dotenv").config();

// Kết nối với database
const database = require("./config/database");
database.connect(); 

// để web đẹp hơn
app.use(express.static("public"));

// Flash
app.use(cookieParser("LHNASDASDAD"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

// bodyParser: để có thể lấy data trong req.body (key:value) từ phía client nhập vào
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//method-override:  use patch , delete ,.. 
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// file pug
app.set("views","./views");
app.set('view engine', 'pug');

// Trang admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

// người dùng có thể thay đổi /admin
const systemConfig = require("./config/system");
// Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// End Variables

// route
const route = require("./routes/client/index.route"); // Nhúng router
route(app); // truyền app vào ứng dụng express

// port

const port = process.env.PORT;

app.listen(port ,()=>{
    console.log(`listening on port ${port}`);
});