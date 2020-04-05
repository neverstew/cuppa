import React, { useState, useEffect, useCallback } from "react";
import Loading from "./Loading";

const Onboarding = () => {
  return (
    <div id="onboarding">
      <div className="onboarding-container">
        <OnboardingPage />
      </div>
    </div>
  );
};

const OnboardingPage = () => {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [values, setValues] = useState({});
  const [currentValue, setCurrentValue] = useState("");
  const [canContinue, setCanContinue] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentValue && currentValue.length > 0 && currentValue.trim() !== "") {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [currentValue]);

  const next = useCallback(
    (nextPage) => {
      const newValues = { ...values };
      newValues[currentPage] = currentValue;
      setValues(newValues);
      setCurrentValue("");

      if (nextPage) {
        setCurrentPage(nextPage);
      } else {
        setReadyToSubmit(true);
      }
    },
    [currentPage, currentValue, values]
  );

  useEffect(() => {
    if (readyToSubmit) {
      setCurrentPage("loading");
      const data = JSON.stringify({
        user: {
          name: values.name,
          description: values.description,
        },
      });
      Rails.ajax({
        beforeSend(xhr, options) {
          xhr.setRequestHeader(
            "Content-Type",
            "application/json; charset=UTF-8"
          );
          // Workaround: add options.data late to avoid Content-Type header to already being set in stone
          // https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts/rails-ujs/utils/ajax.coffee#L53
          options.data = data;
          return true;
        },
        url: "/onboarding.json",
        type: "post",
        success: () => {
          setReadyToSubmit(false);
          console.log("Onboarding completed.");
          setCurrentPage("success");
          setSuccess(true);
        },
        error: (err) => {
          setReadyToSubmit(false);
          console.error("Onboarding failed.", err);
          setCurrentPage("error");
        },
      });
    }
  });

  useEffect(() => {
    if(success) {
      setTimeout(() => {
        window.location.replace('/');
      }, 2000)
    }
  }, [success])

  switch (currentPage) {
    case "welcome":
      return (
        <form className="onboarding-form" onSubmit={(e) => e.preventDefault()}>
          <div className="onboarding-body">
            <h1>Welcome to cuppa</h1>
            <p>
              We need a few more details from you before we can match you with
              people... This should only take a minute.
            </p>
          </div>
          <div className="onboarding-footer">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage("name")}
            >
              Let's do it
            </button>
          </div>
        </form>
      );
    case "name":
      return (
        <form className="onboarding-form" onSubmit={(e) => e.preventDefault()}>
          <div className="onboarding-body">
            <h1>Name</h1>
            <p>What should our community call you?</p>
            <input
              type="text"
              required="required"
              onChange={(e) => setCurrentValue(e.target.value)}
              value={currentValue}
            />
          </div>
          <div className="onboarding-footer">
            <button
              className="btn btn-primary"
              disabled={!canContinue}
              onClick={() => next("description")}
            >
              Next
            </button>
          </div>
        </form>
      );
    // case "avatar":
    //   return (
    //     <form className="onboarding-form" onSubmit={(e) => e.preventDefault()}>
    //       <div className="onboarding-body">
    //         <h1>Profile Picture</h1>
    //         <p>
    //           Let us see your wonderful face! Showing your face helps people
    //           know that you're real.
    //         </p>
    //         <input
    //           type="file"
    //           required="required"
    //           onChange={(e) => setCurrentValue(e.target.value)}
    //           value={currentValue}
    //         />
    //       </div>
    //       <div className="onboarding-footer">
    //         <button
    //           className="btn btn-primary"
    //           disabled={!canContinue}
    //           onClick={() => next("description")}
    //         >
    //           Next
    //         </button>
    //       </div>
    //     </form>
    //   );
    case "description":
      return (
        <form className="onboarding-form" onSubmit={(e) => e.preventDefault()}>
          <div className="onboarding-body">
            <h1>Description</h1>
            <p>
              Tell us a bit about yourself. What are you looking to get out of
              using cuppa?
            </p>
            <textarea
              type="text"
              rows="10"
              required="required"
              onChange={(e) => setCurrentValue(e.target.value)}
              value={currentValue}
            />
          </div>
          <div className="onboarding-footer">
            <button
              className="btn btn-primary"
              disabled={!canContinue}
              onClick={() => next()}
            >
              Next
            </button>
          </div>
        </form>
      );
    // case 'location':
    //   return (
    //     <form className='onboarding-form' onSubmit={(e) => e.preventDefault()}>
    //       <div className='onboarding-body'>
    //         <h1>Location</h1>
    //         <p>We use your location to match you to nearby people. We won't display it to anyone.</p>
    //         <LocationSearchInput onLocationChange={location => setCurrentValue(location)} />
    //       </div>
    //       <div className='onboarding-footer'>
    //         <button className='btn btn-primary' disabled={!canContinue} onClick={submit}>Finish</button>
    //       </div>
    //     </form>
    //   );
    case "success":
      return (
        <div className="feedback-wrapper">
          <p className="text-success">Success!</p>
          <p className="text-muted">Let's get the brews in.</p>
        </div>
      );
    case "error":
      return (
        <div className="feedback-wrapper">
          <p className="text-danger">Sorry, something went wrong...</p>
          <button className="btn btn-primary" onClick={() => setReadyToSubmit(true)}>Try again</button>
        </div>
      );
    default:
      return (
        <div className="feedback-wrapper">
          <Loading />
        </div>
      );
  }
};

export default Onboarding;
