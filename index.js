const { express, cors, port } = require("./config/config");
const { run } = require("./config/db");
const auctionRouters = require("./routers/auction.product");
const authUser = require("./routers/auth.user");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use("/api/auth", authUser);
app.use("/api/auction", auctionRouters);

app.get("/health", (req, res) => {
    res.status(200).send({ message: "Server is healthy" });
});

app.use((req, res, next) => {
    res.status(404).send({ message: "Page not found" });
});

//Error handling Globally
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send({ message: "Something went wrong" });
});

app.listen(port, async () => {
    await run();

    console.log(`Connected to MongoDB`);
    console.log(`Server is running on port ${port}`);
});
