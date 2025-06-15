const { express, cors, port } = require("./config/config");
const { run } = require("./config/db");
const authUser = require("./routers/auth.user");

const app = express();


app.use(express.json());
app.use(cors());
app.use("/api/auth", authUser);


app.listen(port, async()=>{
    await run();

    console.log(`Connected to MongoDB`);
    console.log(`Server is running on port ${port}`);
})