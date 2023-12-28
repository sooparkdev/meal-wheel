import React, { useState, useEffect } from "react";
import styles from "@/styles/onboarding.module.css";
import ProfileForm from "@/components/ProfileForm";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <div className={styles.stepIndicators}>
        <span className={currentStep >= 1 ? styles.activeStep : ""}>
          Step 1
        </span>
        <span className={currentStep >= 2 ? styles.activeStep : ""}>
          Step 2
        </span>
        <span className={currentStep >= 3 ? styles.activeStep : ""}>
          Step 3
        </span>
      </div>

      {currentStep === 1 && (
        <div className={styles.stepSection}>
          <h2 className={styles.stepTitle}>Background Check</h2>
          <p className={styles.stepDescription}>
            This step is intended to ensure the safety and integrity of our
            community. In a real-world application, we would conduct a thorough
            background check, including criminal records, employment history,
            and previous addresses.
          </p>
          <p className={styles.stepNote}>
            <i>
              Note: This is a simulated step for demonstration purposes only.
            </i>
          </p>
          <button
            type="button"
            onClick={handleNextStep}
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.stepSection}>
          <h2 className={styles.stepTitle}>ID Verification</h2>
          <p className={styles.stepDescription}>
            In a real-world scenario, this step is crucial for verifying your
            identity through a government-issued ID. It&apos;s an integral part
            of ensuring the authenticity of our users. You would typically be
            required to upload a clear photograph or a scan of an ID, such as a
            driver&apos;s license or passport.
          </p>

          <p className={styles.stepNote}>
            <i>
              Note: This is a simulated step for demonstration purposes only.
            </i>
          </p>
          <button
            type="button"
            onClick={handleNextStep}
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className={styles.stepSection}>
          <h2 className={styles.stepTitle}>User Details</h2>
          <ProfileForm isInitialSetup={true} />
        </div>
      )}
    </>
  );
};

export default OnboardingPage;
