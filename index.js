const express = require("express"),
    app = express(),
    { TeamTrees } = require("teamtrees-api"),
    teamTrees = new TeamTrees()

require("dotenv").config({"path" : "./variables.env"})

app.use(require("cors")())
app.use(require("body-parser").json())
app.use(require("body-parser").urlencoded())

app.get("/", (req, res) => {
    res.send("use /get-data to get the data.")
})

app.get("/get-data", (req, res) => {
    let getData = async () => {
        return {
            treesLeft: await teamTrees.getLeft(),
            mostRecent: await teamTrees.getMostRecent(),
            totalTrees: await teamTrees.getTotalTrees(),
            topTrees: await teamTrees.getMostTrees()
        }
    }
    getData().then(data => {
        res.json(data)
    })
})

app.listen(process.env.PORT)