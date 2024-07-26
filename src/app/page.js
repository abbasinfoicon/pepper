'use client'
import Header from "@/components/Header";
import ModalInfo from "@/components/ModalInfo";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import Moveable from "react-moveable";
import html2canvas from 'html2canvas';

const circleImageSources = {
  brown: "/img/brown.png",
  white: "/img/white.png",
  green: "/img/green.png",
  blue: "/img/blue.png",
  skyblue: "/img/skyblue.png"
};

const initialCircleState = {
  basic: true,
  meTime: false,
  taBoard: false,
  route: false,
};

const generateCircles = (src, count) => (
  Array.from({ length: count }, (_, index) => (
    <div className={`circle circle${index}`} key={index}>
      <img src={src} alt="" className="img-fluid" />
    </div>
  ))
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(50);
  const [view, setView] = useState(initialCircleState);
  const [textarea, setTextarea] = useState('');
  const textareaRef = useRef(null);
  const captureRef = useRef(null); // Ref to capture the section

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShow = () => {
    document.getElementById('modalInfo').classList.add("show");
  };

  const resetAll = () => {
    setScale(50);
    setView(initialCircleState);
    clearAllTextareas();
    document.querySelectorAll('.circle').forEach(circle => {
      circle.style.transform = '';
    });
  };

  const handleViewChange = (viewType) => {
    setView({ basic: false, [viewType]: true });
    clearAllTextareas();
    document.querySelectorAll('.circle').forEach(circle => {
      circle.style.transform = '';
    });
  };

  const clearAllTextareas = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.value = "";
    });
  };

  const handleCapture = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'captured-section.png';
        link.click();
      });
    }
  };

  if (loading) {
    return <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />;
  }

  const circleBrown = generateCircles(circleImageSources.brown, 10);
  const circleWhite = generateCircles(circleImageSources.white, 10);
  const circleGreen = generateCircles(circleImageSources.green, 10);
  const circleBlue = generateCircles(circleImageSources.blue, 10);
  const circleSkyBlue = generateCircles(circleImageSources.skyblue, 10);

  return (
    <main className="main">
      <Header handleCapture={handleCapture} />

      <div className="main-wrapper">
        <div className="sidebar">
          <div className="sidebar_left">
            <ul>
              <li><Link href='/'><img src="/img/live.png" alt="live" className="img-fluid" /></Link></li>
              <li><Link href='/'><img src="/img/microphone.png" alt="microphone" className="img-fluid" /></Link></li>
            </ul>
            <button className='infoicon' onClick={handleShow}><img src="assets/img/info-white.svg" alt="info" className="img-fluid" /></button>
          </div>
        </div>
        <div className="main-wrapper-content">
          <div className="row content">
            <div className="col-lg-8 content_editable">
              <div className="img-full" style={{ transform: `scale(${scale / 100 * 2})` }}>
                <div className="bepper left">
                  <div className={`bepper-bx brown ${view.basic || view.meTime ? 'show' : 'hide'}`}>
                    <div className="first">{circleBrown}</div>
                    <div className="second">{circleBrown}</div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <div className={`bepper-bx white ${view.basic || view.route ? 'show' : 'hide'}`}>
                      <div className="first">{circleWhite}</div>
                      <div className="second">{circleWhite}</div>
                    </div>
                    <div className={`bepper-bx brown ${view.route ? 'show' : 'hide'}`}>
                      <div className="first">{circleBlue}</div>
                      <div className="second">{circleBlue}</div>
                    </div>
                  </div>
                </div>

                <div className="Bord_GD" style={{ backgroundImage: `url(/img/${view.taBoard ? 'wood-bg3' : 'wood-bg'}.jpg)` }} ref={captureRef}>
                  <div className={`row ${view.route ? 'arrow' : ''}`}>
                    <div className={`col-md-12 h-76px ${view.taBoard ? 'taBoard' : ''}`}>
                      {
                        view.taBoard ?
                          <div className="row text-center">
                            <div className="col-md-4"><h3>Child</h3></div>
                            <div className="col-md-4"><h3>Adult</h3></div>
                            <div className="col-md-4"><h3>OtherAdult</h3></div>
                          </div> :
                          <div className="Bord_GD-section text-center">
                            <div className="textarea-style">
                              <textarea ref={textareaRef} placeholder="Touch this text to type your main question here"></textarea>
                            </div>
                          </div>
                      }
                    </div>

                    {Array.from({ length: 9 }, (_, index) => (
                      <div className="col-md-4 relative" key={index}>
                        <div className="Bord_GD-section text-center">
                          <div className="img-style">
                            <img src="/img/circle.png" alt="" className="img-fluid m-auto" />
                          </div>
                          <div className="text-style">
                            <textarea ref={textareaRef} onChange={(e) => setTextarea(e.target.value)} placeholder="Touch to type"></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`bepper-bx cntr skyblue ${view.meTime || view.taBoard ? 'show' : 'hide'}`}>
                    <div className="first">{circleSkyBlue}</div>
                    <div className="second">{circleSkyBlue}</div>
                  </div>

                  <div className={`bepper-bx cntr white ${view.taBoard ? 'show' : 'hide'}`}>
                    <div className="first">{circleWhite}</div>
                    <div className="second">{circleWhite}</div>
                  </div>
                </div>

                <div className="bepper right">
                  <div className="flex gap-4">
                    <div className={`bepper-bx green ${view.basic || view.meTime || view.route ? 'show' : 'hide'}`}>
                      <div className="first">{circleGreen}</div>
                      <div className="second">{circleGreen}</div>
                    </div>
                    <div className={`bepper-bx brown ${view.route ? 'show' : 'hide'}`}>
                      <div className="first">{circleBrown}</div>
                      <div className="second">{circleBrown}</div>
                    </div>
                    <div className={`bepper-bx brown ${view.taBoard ? 'show' : 'hide'}`}>
                      <div className="first">{circleBlue}</div>
                      <div className="second">{circleBlue}</div>
                    </div>
                  </div>

                  <p className="text-green-700 filter-none">
                    {view.basic && 'Basic'}
                    {view.meTime && 'Me Time'}
                    {view.taBoard && 'TA'}
                    {view.route && 'Route'} Board
                  </p>
                </div>

                <Moveable
                  target={".circle"}
                  individualGroupable={true}
                  draggable={true}
                  throttleDrag={1}
                  edgeDraggable={false}
                  startDragRotate={0}
                  throttleDragRotate={0}
                  preventDefault={false}
                  onDrag={e => {
                    e.target.style.transform = e.transform;
                  }}
                />
              </div>
            </div>
          </div>

          <div className="content_fixed">
            <ul>
              <li className='clrbox'>
                <span className="circle clr clr1"><img src="/img/white.png" alt="" className="img-fluid" /></span>
                <span className="circle clr clr2"><img src="/img/yellow.png" alt="" className="img-fluid" /></span>
              </li>
            </ul>
            <ul>
              <li className={`undo ${view.basic ? 'active' : ''}`}><button onClick={() => handleViewChange('basic')}>Basic</button></li>
              <li className={`undo ${view.meTime ? 'active' : ''}`}><button onClick={() => handleViewChange('meTime')}>Me Time</button></li>
              <li className={`undo ${view.taBoard ? 'active' : ''}`}><button onClick={() => handleViewChange('taBoard')}>TA Board</button></li>
              <li className={`undo ${view.route ? 'active' : ''}`}><button onClick={() => handleViewChange('route')}>Route</button></li>
            </ul>
            <div className="reset-zoom">
              <div className="reset">
                <p onClick={resetAll}>reset <img src="assets/img/reset.svg" alt="reset" className="img-fluid" /></p>
              </div>
              <div className="zoom">
                <p>zoom</p>
                <input type="range" min="10" max="50" value={scale} onChange={e => setScale(parseInt(e.target.value, 10))} />
              </div>
            </div>
          </div>
        </div>
        <ModalInfo />
      </div>
    </main>
  );
}
