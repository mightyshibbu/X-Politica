import React from 'react';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h1>How to Use X-Politica</h1>
      <section>
        <h2>1. Sign Up as a Citizen or Leader</h2>
        <p>
          To get started, sign up as a Citizen or a Leader by navigating to the appropriate sign-up page from the homepage. 
          Citizens can file claims, while Leaders can manage and respond to those claims.
        </p>
      </section>

      <section>
        <h2>2. Log In to Your Account</h2>
        <p>
          Once registered, log in using your email and password. Citizens can log in to their account to file and track claims, 
          while Leaders can log in to view and manage submitted claims.
        </p>
      </section>

      <section>
        <h2>3. File a Claim (For Citizens)</h2>
        <p>
          After logging in as a Citizen, you can file a new claim by navigating to the 'New Claim' page. 
          Fill in the required details and submit your claim. 
          You can view the status of your claims on the 'My Claims' page.
        </p>
      </section>

      <section>
        <h2>4. Manage Claims (For Leaders)</h2>
        <p>
          Leaders can view all submitted claims on the 'Leader Homepage'. 
          You can approve or deny claims, and provide feedback or request additional information if necessary.
        </p>
      </section>

      <section>
        <h2>5. Track Your Claims (For Citizens)</h2>
        <p>
          Citizens can track the status of their claims on the 'My Claims' page. 
          The page also includes graphs and statistics to help you monitor the progress and outcomes of your claims.
        </p>
      </section>

      <section>
        <h2>6. View Statistics and Graphs</h2>
        <p>
          Both Citizens and Leaders can view statistics and graphs related to claims filed, 
          approved, and denied. These visualizations provide insights into the overall performance and outcomes of the claims process.
        </p>
      </section>

      <section>
        <h2>7. Log Out</h2>
        <p>
          When you are done, you can log out of your account by clicking the 'Log Out' button in the header.
        </p>
      </section>
    </div>
  );
};

export default Instructions;
