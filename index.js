// Tạo 1 ứng dụng express cơ bản
const express= require('express');
const app = express();
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var path = require('path');
// Chuẩn hoá tháng
const moment = require("moment");

//  Ẩn những file mình làm
require("dotenv").config();

// Kết nối với database
const database = require("./config/database");
database.connect(); 

// để web đẹp hơn
app.use(express.static(`${__dirname}/public`));

// để chỉnh nhiều fone(tinymce) phải nhúng path
app.use(
    '/tinymce', 
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);


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
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');


// Trang admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

// route
const route = require("./routes/client/index.route"); // Nhúng router
route(app); // truyền app vào ứng dụng express

// người dùng có thể thay đổi /admin
const systemConfig = require("./config/system");
// Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// End Variables

// Moment
app.locals.moment = moment;

// End Moment

// port

const port = process.env.PORT;
app.get("*", (req, res) => {
    res.render(("client/pages/errors/404.pug"),{
        pageTitle: "404 Not Found",
    })
});

app.listen(port ,()=>{
    console.log(`listening on port ${port}`);
});