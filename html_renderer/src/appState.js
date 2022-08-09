import Vue from 'vue';

class AppState {
  constructor() {
    this.visibleGroups = {};
    this.timeFormat = "absolute";
    this.timeRelativeTo = "total";
  }

  isGroupVisible(group) {
    return this.visibleGroups[group.id] === true;
  }

  setGroupVisibility(group, visible) {
    Vue.set(this.visibleGroups, group.id, visible);
  }

  setTimeType(timeFormat, timeRelativeTo){
    this.timeFormat = timeFormat;
    this.timeRelativeTo = timeRelativeTo;
  }
}

const appState = new AppState()
export default appState;
