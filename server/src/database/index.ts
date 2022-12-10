import { connection, SortOrder } from "mongoose";
import { IPaste, Paste } from "../models/paste.model";
import { Tag, ITag } from "../models/tags.model";
import { Alert, IAlert } from "../models/alerts.model";
import escapeRegexp from "escape-string-regexp-node";

const db = connection;
db.on("error", (err) => {
  console.log(err);
});

export async function pushPasteToDB(paste: IPaste) {
  try {
    await Paste.insertMany(paste);
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

export async function getPastesHeadings() {
  try {
    const pastesHeadings = await Paste.find({}, { title: 1, _id: 0 });
    return pastesHeadings.map((x) => x.title);
  } catch (error) {
    console.log(error);
  }
}

export async function checkForDuplicatesDB(title: string, content: string) {
  try {
    const findResult = await Paste.countDocuments({
      $and: [{ title: title }, { content: content }],
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
  sort: string,
  order: number,
  search: string | null,
  tags: boolean
) {
  try {
    const tagsList = await getTags();
    let findQuery = {};
    const searchRegex = new RegExp(escapeRegexp(search), "i");
    if (search && tags) {
      findQuery = {
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { author: searchRegex },
        ],
      };
      if (tagsList.length > 0) findQuery["tags"] = { $in: tags };
    } else if (search && !tags) {
      findQuery = {
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { author: searchRegex },
        ],
      };
    } else if (!search && tags) {
      if (tagsList.length > 0) findQuery["tags"] = { $in: tags };
    }
    const res = await Paste.find(findQuery)
      .sort([[sort, order as SortOrder]])
      .skip(page * 20 - 20)
      .limit(20);
    const count = await Paste.countDocuments(findQuery);
    return { documents: res, count: count };
  } catch (error) {
    console.log(error);
  }
}

export async function getLastDBItem() {
  try {
    const last = await Paste.find({}).sort({ date: -1 }).limit(1);
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

export async function getAlerts(limit: number, offset: number, sort: 1 | -1) {
  try {
    const res = await Alert.find({})
      .sort([["date", sort]])
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
