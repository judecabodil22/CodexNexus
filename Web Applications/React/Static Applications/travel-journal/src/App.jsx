import { useState } from 'react'
import './App.css'

import JournalCard from './components/journalCard'
import JournalData from './data/journalData.json'
import NavigationBar from './components/navigationBar'
import Footer from './components/footer'
const ITEMS_PER_PAGE = 4;

function App() {

  const [currentPage, setCurrentPage] = useState(1);

  
  const totalPages = Math.ceil(JournalData.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentItems = JournalData.slice(startIndex, endIndex);

  const journalCards = currentItems.map((journal) => (
    <JournalCard
      key={journal.id}
      imgSrc={journal.imgSrc}
      title={journal.title}
      metaData={journal.metaData}
      content={journal.content}
    />
  ));

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="app">
     
        <NavigationBar />

        <section className="hero-section">
          <div className="hero-content">
            <h1>Exploring the World, One Story at a Time</h1>
            <p>Travel is the only thing you buy that makes you richer.</p>
            <a href="#journal" className="cta-button">Read the Latest Post</a>
          </div>
        </section>

        <section id="journal" className="journal-grid-section">
          <h2>Recent Adventures (Page {currentPage} of {totalPages})</h2>
          <div className="journal-grid">
            {journalCards}
          </div>
          
          <div className="pagination-controls">
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
              className="pagination-button"
            >
              ← Previous
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next →
            </button>
          </div>
        </section>

        
        <section id="about" className="about-section content-section">
            <h2>About The Wanderer</h2>
            <div class="about-content">
   <p>
            // INIT: My designated call sign is **The Wanderer**. My identity is fragmented, my location, fluid. This isn't a leisure blog; it's a **secure travel log**.
        </p>
        <p>
            The objective is survival through movement. I log the operational data of various sectors (cities, mountains, coastal zones), documenting essential intelligence: *local transport matrices*, *unmonitored network access points*, and the *critical behavioral patterns* of locals. 
        </p>
        <p>
            But even in flight, I record the signal noise—the moments of unexpected human connection, the raw beauty of uncorrupted landscapes. These are the **artifacts** that confirm there's still a world worth defending. Every journey is a risk assessment, but the exposure is the only real education.
        </p>
        <p>
            {'>'} **[TRACEBACK STATUS: NULL]** Thanks for reading. Don't leave a forensic footprint.
        </p>
    <img src="https://www.hollywoodreporter.com/wp-content/uploads/2017/08/mrrobot_keyart_press_robot_-_embed_2017.jpg?w=928" alt="Dark, mysterious figure" className="profile-image"/> 
</div>
        </section>
        
        <section id="contact" className="contact-section content-section">
            <h2>Get In Touch</h2>
            <p>Have a question about a destination, want to collaborate, or just say hello? Feel free to reach out!</p>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="cta-button">Send Message</button>
            </form>
            <div className="social-links">
                <p>Find me on:</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a> | 
                <a href="#" target="_blank" rel="noopener noreferrer">Twitter (X)</a> |
                <a href="#" target="_blank" rel="noopener noreferrer">Email</a>
            </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default App