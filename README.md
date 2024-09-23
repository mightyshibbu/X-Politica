# X-Politica 🚀

### A Comprehensive Full-Stack MERN Application

Welcome to **X-Politica**! This project is a showcase of my expertise in designing and implementing complex systems using the MERN (MongoDB, Express, React, Node.js) stack. The application features secure authentication and authorization mechanisms and a user-friendly interface to manage and track claims and approvals.

---

## Why X-Politica? 🌐

**X-Politica** was developed to address the need for a streamlined and secure platform for managing political claims and approvals. The application provides a robust solution for leaders and citizens to interact, ensuring transparency and accountability in the decision-making process.

### Key Features:
- **Secure Authentication & Authorization**: Implemented using JSON Web Tokens (JWT) and bCrypt for password hashing, ensuring that user data is protected.
- **Responsive Design**: The application is built with a responsive design, making it accessible on various devices.
- **User Management**: Allows users to sign up, log in, and manage their claims effectively.
- **Real-Time Updates**: Users can view the status of their claims in real time, with notifications for any updates.

### Use Case Format 📋
- As a User, I can create an account as a Leader so that I can showcase myself in my area.

- As a User, I can log in so that I can make CRUD operations on my own account details.

- As a User, I can create an account as a Citizen so that I can see the claims of Leaders from my area.

- As a Leader, I can upload a claim from any area so that citizens from that area can validate it, and that claim will be shown on my portfolio.

- As a Leader, I can view stats and graphs so that I can understand my statistics and make informed decisions.

- As a Citizen, I can validate claims so that the leader receives appreciation, and it can be shown on their portfolio.



## Getting Started 🛠️

To get started with **X-Politica**, follow the steps below:

### Prerequisites:
- Node.js
- MongoDB

### Installation:
    git clone https://github.com/your-username/X-Politica.git
    cd X-Politica
    npm i
    npm run dev
    cd ../X-PoliticaServer
    npm i
    npm start
    ```
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/X-Politica.git
    cd X-Politica
    ```

2. **Install dependencies for both client and server:**
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory with the following keys:

    ```
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
    ```

4. **Run the application:**

    ```bash
    cd server
    npm start
    cd ../client
    npm start
    ```

5. **Access the application:**

    Open your browser and go to `http://localhost:5173`.

---

## Team Members 👥

- **Pranav Tripathi** -  [PROJECT LEAD] CDAC ACTS 2024 (I), Full-Stack Developer
- **Rahul Sura**- CDAC ACTS 2024 (I), Full-Stack Developer
- **Vinayak Shankar** - CDAC ACTS 2024 (I), Full-Stack Developer 
- **Pradumna Narkhede** - CDAC ACTS 2024 (I), UI/UX 
- **Saaril Shah** - CDAC ACTS 2024 (I), UI/UX

---

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing 🤝

Contributions are welcome! Please fork this repository and submit a pull request for review.

---

## Acknowledgments 🙌

- Thank you to all the open-source contributors whose libraries and tools helped make this project possible.
