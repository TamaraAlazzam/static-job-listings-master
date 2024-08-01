export default class Job {
  #id;
  #company;
  #logo;
  #isNew;
  #featured;
  #position;
  #role;
  #level;
  #postedAt;
  #contract;
  #location;
  #languages;
  #tools;
  #tags;

  constructor({
    id,
    company,
    logo,
    new: isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  }) {
    this.#id = id;
    this.#company = company;
    this.#logo = logo;
    this.#isNew = isNew;
    this.#featured = featured;
    this.#position = position;
    this.#role = role;
    this.#level = level;
    this.#postedAt = postedAt;
    this.#contract = contract;
    this.#location = location;
    this.#languages = languages;
    this.#tools = tools;
    this.#tags = [];

    this.#tags.push(this.#role, this.#level);
    this.#tags.push(...this.#languages);
    this.#tags.push(...this.#tools);
  }

  get id() {
    return this.#id;
  }
  set id(value) {
    this.#id = value;
  }

  get company() {
    return this.#company;
  }
  set company(value) {
    this.#company = value;
  }

  get logo() {
    return this.#logo;
  }
  set logo(value) {
    this.#logo = value;
  }

  get isNew() {
    return this.#isNew;
  }
  set isNew(value) {
    this.#isNew = value;
  }

  get featured() {
    return this.#featured;
  }
  set featured(value) {
    this.#featured = value;
  }

  get position() {
    return this.#position;
  }
  set position(value) {
    this.#position = value;
    this.#updateTags();
  }

  get role() {
    return this.#role;
  }
  set role(value) {
    this.#role = value;
    this.#updateTags();
  }

  get level() {
    return this.#level;
  }
  set level(value) {
    this.#level = value;
    this.#updateTags();
  }

  get postedAt() {
    return this.#postedAt;
  }
  set postedAt(value) {
    this.#postedAt = value;
  }

  get contract() {
    return this.#contract;
  }
  set contract(value) {
    this.#contract = value;
  }

  get location() {
    return this.#location;
  }
  set location(value) {
    this.#location = value;
  }

  get languages() {
    return this.#languages;
  }
  set languages(value) {
    this.#languages = Array.isArray(value) ? value : [];
    this.#updateTags();
  }

  get tools() {
    return this.#tools;
  }
  set tools(value) {
    this.#tools = Array.isArray(value) ? value : [];
    this.#updateTags();
  }

  get tags() {
    return this.#tags;
  }
  #updateTags() {
    this.#tags = [];
    this.#tags.push(this.#position, this.#role, this.#level);
    this.#tags.push(...this.#languages);
    this.#tags.push(...this.#tools);
  }
}
