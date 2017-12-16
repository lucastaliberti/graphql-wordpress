import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default class User {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('user');
    this.loader = new DataLoader(ids => findByIds(this.collection, ids));
  }

  findOneById(id) {
    return this.loader.load(id);
  }

  count(args = {}) {
    const criteria = Object.assign({}, args);
    delete criteria.search;
    if (args.search) {
      criteria.$text = { $search: args.search };
    }
    return this.collection.find(criteria).count();
  }

  all({ limit = 10, offset = 0, search = null }) {
    const criteria = {};
    if (search) {
      criteria.$text = { $search: search };
    }

    return this.collection
      .find(criteria, { hash: 0 })
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)
      .toArray();
  }

  async insert(doc) {
    const { password, ...fields } = doc;
    if (!fields.email || !password) {
      throw new Error('Email and Password are required.');
    }
    const exists = await this.count({ email: fields.email });
    if (exists) {
      throw new Error('Email already exists.');
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const docToInsert = Object.assign({}, fields, {
      hash,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const id = (await this.collection.insertOne(docToInsert)).insertedId;
    return id;
  }

  async updateById(id, { password = null, ...fields }) {
    const docToUpdate = Object.assign({}, fields);
    if (fields.email) {
      const exists = await this.count({ email: fields.email });
      if (exists) {
        throw new Error('Email already exists.');
      }
    }
    if (password) {
      docToUpdate.hash = await bcrypt.hash(password, SALT_ROUNDS);
    }
    const ret = await this.collection.update(
      { _id: id },
      {
        $set: Object.assign({}, docToUpdate, {
          updatedAt: Date.now(),
        }),
      }
    );
    this.loader.clear(id);
    return ret;
  }

  async removeById(id) {
    const ret = this.collection.remove({ _id: id });
    this.loader.clear(id);
    return ret;
  }
}