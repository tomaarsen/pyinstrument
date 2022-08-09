import Group from './Group';

export default class Frame {
  constructor(jsonObject, parent = null, context = { groups: {} }) {
    this.parent = parent;
    this.function = jsonObject.function;
    this.filePathShort = jsonObject.file_path_short;
    this.filePath = jsonObject.file_path;
    this.lineNo = jsonObject.line_no;
    this.time = jsonObject.time;
    this.totalTime = this.parent ? this.parent.totalTime : this.time;
    this.isApplicationCode = jsonObject.is_application_code

    if (jsonObject.group_id) {
      const groupId = jsonObject.group_id;
      let group = context.groups[groupId]
      if (!group) {
        group = context.groups[groupId] = new Group(groupId, this);
      }
      group.addFrame(this);
      this.group = context.groups[groupId];
    } else {
      this.group = null;
    }

    this.children = jsonObject.children.map(f => new Frame(f, this, context));
  }

  get proportionOfTotal() {
    // if (this.parent) {
    //   return this.parent.proportionOfTotal * this.proportionOfParent;
    // } else {
    //   return 1.0;
    // }
    return this.time / this.totalTime;
  }

  // get proportionOfParent() {
  //   if (this.parent) {
  //     return this.time / this.parent.time;
  //   } else {
  //     return 1.0;
  //   }
  // }

  get perFrameTime() {
    return this.time - this.children.map(({ time }) => time).reduce((a, b) => a + b, 0)
  }

  get perFrameProportionOfTotal() {
    return this.perFrameTime / this.totalTime;
  }
}
