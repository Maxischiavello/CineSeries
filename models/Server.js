require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const DB = require("../helpers/db.helper");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      admin: "/api/admin",
      user: "/api/user",
      adminLogin: "/api/admin_login",
      userLogin: "/api/user_login",
      movie: "/api/movie",
      news: "/api/news",
      show: "/api/show",
      video: "/api/video",
    };
  }

  listen() {
    DB.connect().then(() => {
      this.middlewares();

      this.routes();

      this.app.listen(this.port, () => {
        console.log(`Server listening on ${this.port}`);
      });
    });
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json({ extended: true }));
  }

  routes() {
    this.app.use(this.path.admin, require("../routes/adminRoutes"));
    this.app.use(this.path.user, require("../routes/userRoutes"));
    this.app.use(this.path.adminLogin, require("../routes/authAdminRoutes"));
    this.app.use(this.path.userLogin, require("../routes/authUserRoutes"));
    this.app.use(this.path.movie, require("../routes/movieRoutes"));
    this.app.use(this.path.news, require("../routes/newsRoutes"));
    this.app.use(this.path.show, require("../routes/showRoutes"));
    this.app.use(this.path.video, require("../routes/videoRoutes"));
  }
}

module.exports = Server;
