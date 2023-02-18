export const REFRESH_PAGE = "REFRESH_PAGE";
export const REFRESH_MODAl = "REFRESH_MODAl";
class PageEventBus {
  constructor() {
    this.eventListeners = {};
  }
  subscribe(listenerName, fn) {
    if (!this.eventListeners[listenerName]) {
      this.eventListeners[listenerName] = fn;
    }
  }
  unsubscribe(listenerName) {
    if (this.eventListeners[listenerName]) {
      delete this.eventListeners[listenerName];
    }
  }
  publish(listenerName, params) {
    if (this.eventListeners[listenerName]) {
      this.eventListeners[listenerName](params);
    }
  }
  publishSimilarEvents(listenerNamePattern) {
    const keys = Object.keys(this.eventListeners);
    keys.forEach((key) => {
      if (
        listenerNamePattern.test(key) &&
        typeof this.eventListeners[key] === "function"
      ) {
        this.eventListeners[key]();
      }
    });
  }
}
export const eventBus = new PageEventBus();
