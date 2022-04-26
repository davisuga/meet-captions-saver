import { createSignal } from "solid-js";
import { startObserving, stopObserving } from "./captions-grabber";

function App() {
  const [observing, setObserving] = createSignal(false);

  const handleClickObserve = () => {
    setObserving(true);
    startObserving();
  };
  const handleClickStop = () => {
    setObserving(false);
    stopObserving();
  };

  return (
    <div>
      {!observing() ? (
        <button
          onClick={handleClickObserve}
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        >
          Start saving CC
        </button>
      ) : (
        <button
          onClick={handleClickStop}
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        >
          Stop saving CC
        </button>
      )}
      {observing() && <div>Saving captions...</div>}
    </div>
  );
}

export default App;
