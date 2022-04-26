const CAPTIONS_SELECTOR =
  "#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.a4cQT > div:nth-child(1) > div:nth-child(1)";
const lastOf = <T extends unknown>(list?: T[]) =>
  list ? list[list.length - 1] : null;

const removeLast = <T extends unknown>(list: T[]) =>
  list.splice(0, list.length - 1);

type CaptionLine = string;

const getCaptionsFeed = () =>
  JSON.parse(localStorage.getItem("captions-feed") || "[]") as CaptionLine[];

const setMessagesFeed = (msgs: CaptionLine[]) =>
  localStorage.setItem("captions-feed", JSON.stringify(msgs));

const addToCaptionsFeed = (newCaption?: CaptionLine | null) => {
  if (!newCaption) return;
  const pastMessages = getCaptionsFeed();
  const lastCaption = lastOf(pastMessages);
  if (lastCaption && newCaption.includes(lastCaption)) {
    return setMessagesFeed([...removeLast(pastMessages), newCaption]);
  }
  setMessagesFeed([...pastMessages, newCaption]);
};

const callback: MutationCallback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  mutationsList.forEach(onReceiveMutation);
};

const observer = new MutationObserver(callback);

const targetNode = document.querySelector(CAPTIONS_SELECTOR);

const config = { attributes: true, childList: true, subtree: true };

const getMessageFromMutationRecord = async (update: MutationRecord) => {
  return update.target.textContent;
};
const onReceiveMutation = (m: MutationRecord) => {
  if (m.type === "childList") {
    getMessageFromMutationRecord(m).then(addToCaptionsFeed);
  }
};

export const startObserving = () => {
  targetNode
    ? observer.observe(targetNode, config)
    : console.log("node not found");
  return observer;
};
export const stopObserving = () => observer.disconnect();
