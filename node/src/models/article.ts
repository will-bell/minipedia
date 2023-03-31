import { ObjectId } from "mongodb";

export default class Article {
  constructor(public title: string, public html: string, public id?: ObjectId) {}
}
