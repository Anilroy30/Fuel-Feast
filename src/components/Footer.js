// Footer component for footer section
const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        Created By
        <i className="fa-solid fa-heart"></i>
        <a
          href="https://www.linkedin.com/in/anilkumar-tech/"
          target="_blank"
          title="Anil Kumar's Linkedin Profile"
        >
          Anil Kumar
        </a>
        <i className="fa-solid fa-copyright"></i>
        {year}
        <a
          href="https://github.com/Anilroy30"
          target="_blank"
          title="Food Fire Github Repository"
        >
          {/* <strong>
            Food<span>Fire</span>
          </strong> */}
        </a>
      </div>
    );
  };
  
  export default Footer;