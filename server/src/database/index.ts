import { connection } from "mongoose";
import { IPaste, Paste } from "../models/paste.model";
import { Tag, ITag } from "../models/tags.model";
import { Alert, IAlert } from "../models/alerts.model";

const db = connection;
db.on("error", (err) => {
  console.log(err);
});

export async function pushDataToDB(posts: IPaste[]) {
  try {
    await Paste.insertMany(posts);
    // console.log(`Inserted ${posts.length} documents to DB`);
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

export async function getPastesHeading() {
  try {
    return await Paste.find({}, { projection: { title: 1 } });
  } catch (error) {
    console.log(error);
  }
}

export async function checkForDuplicatesDB(title: string, content: string) {
  try {
    const findResult = await Paste.countDocuments({
      title,
      content,
    });
    if (findResult > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function getPastes(
  page: number,
  orderBy: string,
  search: string | null,
  tags: boolean
) {
  try {
    const tagsList = await getTags();
    const searchParam = {};
    if (search && tags) {
      searchParam["title"] = {
        $regex: new RegExp(search + "|" + tagsList.join("|"), "i"),
      };
    } else if (search && !tags) {
      console.log("hi2");

      searchParam["title"] = {
        $regex: new RegExp(search, "i"),
      };
    } else if (!search && tags) {
      searchParam["title"] = {
        $regex: new RegExp(tagsList.join("|"), "i"),
      };
    }
    const res = await Paste.find(searchParam)
      .sort([[orderBy, -1]])
      .skip(page * 20 - 20)
      .limit(20);
    const count = await Paste.countDocuments(searchParam);
    return { documents: res, count: count };
  } catch (error) {
    console.log(error);
  }
}

export async function getLastDBItem() {
  try {
    const last = await Paste.find().sort({ date: -1 }).limit(1);
    return last[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getTags() {
  try {
    const tagsArr = await Tag.find({});
    return tagsArr.map((x) => x.tag);
  } catch (error) {
    console.log(error);
  }
}

export async function pushTags(arr: ITag[]) {
  try {
    await dropC("tags").then(() => {
      Tag.insertMany(arr);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAlerts(
  limit: number,
  offset: number,
  orderBy: 1 | -1
) {
  try {
    const res = await Alert.find({})
      .sort([["date", orderBy]])
      .skip(offset)
      .limit(limit);
    const count = await Alert.count({});
    return { documents: res, count: count };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getLastAlert() {
  try {
    const last = await Alert.find().sort({ date: -1 }).limit(1);
    return last[0];
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function pushAlert(alert: IAlert) {
  try {
    await Alert.create(alert);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function dropC(collection: string) {
  try {
    await db.dropCollection(collection);
    console.log(`${collection} collection dropped`);
  } catch (error) {
    console.error(`error deleting ${collection} collection`);
  }
}
