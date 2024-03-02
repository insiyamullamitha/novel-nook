# Novel Nook 📚

Novel Nook is a full-stack e-commerce platform designed for selling books. The platform provides users with a seamless and secure experience for browsing and purchasing their favorite books.

## Getting Started 🚀

### Prerequisites 🎓

- Node.js
- npm (Node Package Manager)

### Clone and run 🎬

1. Clone the repository:

```
https://github.com/insiyamullamitha/novel-nook.git
```

2. Navigate to the frontend directory and install dependencies:

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

- 📚 **Book Browsing:** Explore a library of books covering various genres
- 🛒 **User-Friendly Shopping Cart:** Easily add, remove, and update items in your shopping cart
- 🌐 **Google Books API:** Retrieve and display detailed information about each book by fetching data from the Google Books API
- 💳 **Secure Online Payments:** Utilise secure payment methods, including Stripe integration
- 📖 **User Profiles:** Create and manage your user profile with personalised settings
- 💗 **Wishlist Feature:** Enable users to save and track books they are interested in purchasing later
- 🧑‍💻 **Full-Stack Technology:** Built with React.js and Firebase for a robust and scalable application
- ⭐️ **Rate and Review:** Allow users to rate and write reviews for books, enhancing the engagement and community aspect of the platform
- 📱 **Responsive Design:** Ensure a seamless user experience across various devices and screen sizes

## Technologies 🛠️

- **Front-end:**

  - React.js and Vite
  - Tailwind CSS

- **Back-end:**

  - Firebase (Authentication, Firestore)
  - Node.js (for handling Stripe payments)

- **Additional Libraries Used:**
  - daisyUI (Accordion component)
  - MUI (Star ratings)
  - React Hot Toast (Alerts and Notifications)

## What I Learned 🧠

- 🔥 Integration of Firebase for user authentication and data storage
- 💳 Implementation of a backend server and online payment processing using Stripe
- 🎨 Front-end design and styling using React.js and Tailwind CSS
- 📝 State management with React Context
- 🌐 Responsive design skills

## Improvements 📈

- 🔍 **Advanced Search:** Implement advanced search functionality, enabling users to filter books by genre and other characteristics for a more refined search experience
- 👤 **Admin User Role:** Introduce an admin user role with special privileges, such as managing book listings, user accounts, and monitoring reviews
- 📰 **News and Updates:** Create a section for news and updates, keeping users informed about new arrivals, promotions, and platform enhancements, perhaps tailored based on their wishlist and orders
- 💬 **Chat Support:** Integrate a chat support system for users to get assistance and information in real-time
- 💰 **Discount Codes and Sales:** Introduce discount codes and periodic sales events to boost user engagement and drive sales
