# Novel Nook 📚

Novel Nook is a full-stack e-commerce platform designed for selling books. The platform provides users with a seamless and secure experience for browsing and purchasing their favorite books.

## Getting Started 🚀

1. Clone the repository:

### Prerequisites 🎓

- Node.js
- npm (Node Package Manager)

### Clone and run 🎬

1. Clone the repository:

```
https://github.com/insiyamullamitha/novel-nook.git
```

2. Navigate to the frontend and install dependencies:

```
npm install
```

3. Create a **.env** file in the frontend directory containing your Google Maps API key:

```
VITE_REACT_APP_GOOGLE_BOOKS_API_KEY="YOUR_GOOGLE_BOOKS_API_KEY"
```

4. Start the development server:

```
npm run dev
```

5. Navigate to the backend directory and install dependencies:

```
npm install
```

6. Create a **.env** file in the backend directory containing your Stripe test API key:

```
STRIPE_SECRET_KEY = "YOUR_SECRET_STRIPE_KEY"
```

7. Start the backend server

```
node index.js
```

## Features ✨
* 📚 **Book Browsing:** Explore a library of books covering various genres
* 🛒 **User-Friendly Shopping Cart:** Easily add, remove, and update items in your shopping cart
* 💳 **Secure Online Payments:** Utilise secure payment methods, including Stripe integration
* 📖 **User Profiles:** Create and manage your user profile with personalised settings
* 🧑‍💻 **Full-Stack Technology:** Built with React.js and Firebase for a robust and scalable application

## Technologies 🛠️

- **Front-end:**
  - React.js
  - Tailwind CSS

- **Back-end:**
  - Firebase (Authentication, Firestore)
  - Node.js (for handling Stripe pay ments)

- **Payment Processing:**
  - Stripe
 
## What I Learned 🧠

* 🔥 Integration of Firebase for user authentication and data storage
* 💳 Implementation of a backend server and online payment processing using Stripe
* 🎨 Front-end design and styling using React.js and Tailwind CSS
* 📝 State management with React Context

## Improvements

* ⭐️ **Rate and Review:** Allow users to rate and write reviews for books. Enhance the engagement and community aspect of the platform
* 🔍 **Advanced Search:** Implement advanced search functionality, enabling users to search for books by both genre and title for a more refined search experience
* 👤 **Admin User Role:** Introduce an admin user role with special privileges, such as managing book listings, user accounts, and monitoring reviews
* 📚 **Wishlist Feature:** Add a wishlist feature, allowing users to save and track books they are interested in purchasing later
* 📰 **News and Updates:** Create a section for news and updates, keeping users informed about new arrivals, promotions, and platform enhancements
* 💬 **Chat Support:** Integrate a chat support system for users to get assistance and information in real-time
* 📱 **Mobile Optimisation:** Enhance the user experience by implementing responsive design and optimising the mobile interface for smoother navigation and improved functionality on various devices
