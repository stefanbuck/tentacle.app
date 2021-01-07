import { useState } from 'react';
import cn from 'classnames';

export default function Feedback() {
  return (
    <div className="p-3 mb-4 bg-white border-4 border-blue-200 border-dashed rounded bg-blue-50">
      <Content />
    </div>
  );
}

function Content() {
  const [formState, setFormState] = useState({
    submitted: false,
    error: null,
    input: '',
    emoji: '',
    loading: false,
  });

  function submitHandler(event) {
    event.preventDefault();

    setFormState({
      ...formState,
      loading: true,
    });

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        message: `${formState.emoji}\n${formState.input}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setFormState({
            submitted: true,
            error: null,
            input: '',
            loading: false,
          });
          return;
        }
        setFormState({
          ...formState,
          error: 'Oops, something went wrong. Please try again',
          loading: false,
        });
      })
      .catch(() => {
        setFormState({
          ...formState,
          error: 'Oops, something went wrong. Please try again',
          loading: false,
        });
      });
  }

  const emojiList = ['😣', '😕', '😀', '🤩'];

  if (formState.submitted) {
    return (
      <div className="px-6 py-3 text-center">
        <span className="text-green-700 ">
          Your feedback has been received! Thank you for your help.
        </span>
        <br />
        <button
          type="button"
          className="text-gray-600 underline"
          onClick={() => {
            setFormState({ ...formState, submitted: false });
          }}
        >
          Submit more feedback
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="pb-3 text-lg font-bold text-gray-900">
        Is this app helpful?
      </h3>
      <form onSubmit={submitHandler}>
        {!formState.data &&
          emojiList.map((emoji) => (
            <button
              onClick={(event) => {
                setFormState({ ...formState, emoji: event.target.innerText });
              }}
              type="button"
              key={emoji}
              className={cn(
                'px-3 py-1 mx-4 mb-3 text-2xl transform hover:scale-125 filter-grayscale hover:filter-none',
                {
                  'filter-none': emoji === formState.emoji,
                }
              )}
            >
              {emoji}
            </button>
          ))}
        {formState.emoji && (
          <>
            <label className="block">
              Comment <span className="text-sm text-gray-500">(optional)</span>
              <textarea
                value={formState.input}
                className="block w-full h-20 m-auto border sm:w-3/5"
                onChange={(event) =>
                  setFormState({ ...formState, input: event.target.value })
                }
              />
            </label>
            {!formState.loading && (
              <button
                type="submit"
                className="px-2 py-1 mt-2 text-white bg-green-500 rounded-lg"
              >
                Send Feedback
              </button>
            )}
            {formState.loading && (
              <button
                disabled
                type="submit"
                className="px-2 py-1 mt-2 text-white bg-green-500 rounded-lg"
              >
                Sending&hellip;
              </button>
            )}
          </>
        )}
        {formState.error && (
          <span className="pl-4 text-red-700">🛑 {formState.error}</span>
        )}
      </form>
    </div>
  );
}
