import React, { Component } from "react";
import Slider from "react-slick";
import NoImage from "../../assets/no-image.jpeg";

class Pictures extends Component {
  render() {
    const NoSlide = (
      <div className="slide">
        <img className="slide-img" src={NoImage} alt="no pic set" />
      </div>
    );

    const Slides = this.props.pictures.map(picture => (
      <div key={picture.id} className="slide">
        <img
          className="slide-img"
          src={picture.url}
          alt={"picture " + picture.index}
        />
      </div>
    ));

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="card">
        <div className="card-content">
          <p className="profile-info-title">Pictures</p>
          {this.props.pictures !== undefined && (
            <Slider {...settings} className="slider">
              {this.props.pictures.length === 0 ? NoSlide : Slides}
            </Slider>
          )}
        </div>
      </div>
    );
  }
}

export default Pictures;
