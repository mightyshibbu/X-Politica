import React from 'react';
import Swiper from 'swiper';
import { Link } from 'react-router-dom';
import '../css/style.css';
import '../css/swiper-bundle.min.css'

const LeaderSwiper = ({ leaders }) => {
  console.log("sdsdsds",leaders);
  
  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {leaders.map((item, index) => {
          // Destructure leader and maxApprovedClaims from item
          // const { leader, maxApprovedClaims } = item;
            
              
          // Ensure that leader is defined and has the necessary properties
          if (!item.leader) {
            return null; // Skip rendering if leader data is not available
          }

          // Use a default value for missing leader properties
          // const { name = 'No Name', party = 'No Party', _id } = leader;

          return (
            <div key={index} className="swiper-slide">
              <div className="leader-card">
                {/* Ensure leader.avatar exists if you want to include it */}
                {/* <img src={leader.avatar || 'default-avatar.png'} alt={name} /> */}
                <h5>{item.leader.name}</h5>
                <p>{item.leader.party}</p>
                <p>Approvals: {item.maxApprovedClaims || 0}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default LeaderSwiper;

// import React from 'react';
// import Swiper from 'swiper';
// import { Link } from 'react-router-dom';
// import '../css/style.css';

// const LeaderSwiper = ({ leaders }) => {
//   return (
//     <div className="swiper-container">
//       <div className="swiper-wrapper">
//         {leaders.map((leader, index) => {
//           // Ensure claims is an array and provide a default value if it's not defined
//           const claims = leader.claims || [];
          
//           // Calculate total approved claims
//           const totalApprovals = claims.reduce((acc, claim) => acc + (claim.approvals || 0), 0);

//           return (
//             <div key={index} className="swiper-slide">
//               <div className="leader-card">
//                 {/* Ensure leader.avatar exists before trying to use it */}
//                 <h5>{leader.name || 'No Name'}</h5>
//                 <p>{leader.party || 'No Party'}</p>
//                 <p>Approvals: {totalApprovals}</p>
//                 <Link to={`/leader/${leader._id}`}>View Profile</Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="swiper-pagination"></div>
//       <div className="swiper-button-prev"></div>
//       <div className="swiper-button-next"></div>
//     </div>
//   );
// };

// export default LeaderSwiper;
