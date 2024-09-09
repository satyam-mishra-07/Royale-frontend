import React from 'react';

const About = () => {
  return (
    <div className="bg-bgColor mt-28 py-12 text-lg font-Italianno">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8 flex flex-col md:flex-row md:items-center">
            <div className="md:mr-12 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl mb-2">About Us</h2>
              <div className="mb-6">
                <h3 className="text-xl font-bold underline text-gray-700 mb-2">Our Story</h3>
                <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">
                  The Royale was born out of a deep appreciation for diverse culinary traditions and a passion for
                  technology. We started with a mission to bring together the finest dishes from around the world under
                  one virtual roof. Each recipe on our menu is curated with care, ensuring that every bite is an
                  unforgettable experience.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold underline text-gray-700 mb-2">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">
                  At The Royale, our mission is to transcend the boundaries of traditional dining. We strive to innovate
                  in the culinary world, offering a platform where food enthusiasts can discover, share, and savor
                  exceptional meals. Whether you're exploring new flavors or rediscovering classics, we aim to make every
                  dining experience with us a journey of delight.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold underline text-gray-700 mb-2">Commitment to Quality</h3>
                <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">
                  Quality is at the heart of everything we do at The Royale. From sourcing the freshest ingredients to
                  collaborating with talented chefs, we prioritize excellence in every dish. We believe that great food
                  starts with great ingredients, and we are committed to delivering nothing less than perfection to our
                  guests.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold underline text-gray-700 mb-2">About the Creator</h3>
                <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">
                  Hi, I'm Satyam Mishra, the creator and developer behind The Royale. With a passion for programming and
                  a love for fine dining, I combined my expertise in technology with my appreciation for culinary arts to
                  create this virtual culinary experience. My journey into web development began during my studies in
                  Electronics and Communication Engineering, where I discovered my knack for building digital solutions
                  that marry functionality with aesthetics.
                </p>
                <div className="mt-4">
                  <p className="text-gray-600 leading-relaxed text-lg sm:text-sm">
                    You can connect with me on:
                    <span className="ml-2">
                      <a
                        href="https://www.linkedin.com/in/satyam-mishra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 transition duration-300"
                      >
                        LinkedIn
                      </a>
                      <span className="mx-1"> • </span>
                      <a
                        href="https://github.com/satyammishra123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 transition duration-300"
                      >
                        GitHub
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
