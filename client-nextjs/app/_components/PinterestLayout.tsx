import React from "react";
import Image from "next/image";

interface CardProps {
  size: "small" | "medium" | "large";
  src: string;
}

function Card({ size, src }: CardProps) {
  const styles = {
    card: {
      margin: "10px 10px",
      padding: 0,
      borderRadius: "16px",
    },
    small: {
      gridRowEnd: "span 26", // dimension will be : 26 x 10 row (in Pinterest) -> default: 250 x 260 -> minus margin etc
    },
    //   medium: {
    //     gridRowEnd: "span 33",
    //   },
    medium: {
      gridRowEnd: "span 35",
    },
    //   large: {
    //     gridRowEnd: "span 45",
    //   },
    large: {
      gridRowEnd: "span 60",
    },
  };
  return (
    <div
      style={{
        ...styles.card,
        ...styles[size],
      }}
    >
      <img src={src} className="rounded-sm w-full h-full object-cover" alt="" />
      {/* <div className="rounded-sm w-full h-full object-cover">
        <Image src={src} alt="hey" fill />
      </div> */}
    </div>
  );
}

interface PinterestLayoutProps {
  isLoop?: boolean;
  images?: string[];
}

function PinterestLayout({
  isLoop = false,
  images = [],
}: PinterestLayoutProps) {
  return (
    <div style={styles.pin_container}>
      {isLoop ? (
        images.map((element, index) => (
          <React.Fragment key={index}>
            <Card
              // key={index}
              size="small"
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 1
              }.jpg`}
            />
            <Card
              // key={index}
              size="medium"
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 2
              }.jpg`}
            />
            <Card
              size="small"
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 3
              }.jpg`}
            />
            <Card
              // key={index}
              size="medium" // You can adjust the size as needed
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 4
              }.jpg`}
            />
            <Card
              // key={index}
              size="medium"
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 5
              }.jpg`}
            />
            <Card
              // key={index}
              size="small"
              src={`https://storage.googleapis.com/dream-home-org/${element}_${
                index + 6
              }.jpg`}
            />
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          {/* <Card
            size="small"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_1.jpg`
            )}
          />
          <Card
            size="medium"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_2.jpg`
            )}
          />
          <Card
            size="small"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_3.jpg`
            )}
          />
          <Card
            size="medium"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_4.jpg`
            )}
          />
          <Card
            size="medium"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_5.jpg`
            )}
          />
          <Card
            size="small"
            src={require(
              `../../src/assests/house-style-random/quiz-cover_6.jpg`
            )}
          /> */}
        </React.Fragment>
      )}
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    // width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 200px)",
    gridAutoRows: "10px",
    // position: "absolute",
    // left: "50%",
    // transform: "translateX(-50%)",
    justifyContent: "center",
    // backgroundColor: "black",
  },
};

export default PinterestLayout;
