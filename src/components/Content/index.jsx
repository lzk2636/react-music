import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";
import Discovery from "../../views/Discovery";
import Mv from "../../views/Mv";
import Mvs from "../../views/Mvs";
import NotFound from "../../views/NotFound";
import Playlists from "../../views/Playlists";
import Playlist from "../../views/Playlist";
import Songs from "../../views/Songs";
import Search from "../../views/Search";
import bus from '../../utils/bus'
import {getSongUrl} from '../../api/discovery'

class Content extends Component {
    constructor(){
        super()
        this.state={
            url:""
        }
        this.audioRef=React.createRef()
    }
    componentDidMount(){
        bus.on("playId",async res=>{
          const result = await getSongUrl({id:res})
          this.setState({
              url:result.data.data[0].url
          })

        })
    }
    render() {
        return (

            <Router>
                <div className="index-container">
                    <div className="nav">
                        <ul>
                            <li>
                                <NavLink activeClassName="router-link-active" to="/discovery">
                                    <span className="iconfont icon-find-music"></span>
                                  发现音乐
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="router-link-active" to="/playlists">
                                    <span className="iconfont icon-music-list"></span>
                                  推荐歌单
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="router-link-active" to="/songs">
                                    <span className="iconfont icon-music"></span>
                                  最新音乐
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="router-link-active" to="/mvs">
                                    <span className="iconfont icon-mv"></span>
                                  最新MV
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="main">
                        <Switch>
                            <Route path="/discovery" component={Discovery} />
                            <Route path="/playlists" component={Playlists} />
                            <Route path="/songs" component={Songs} />
                            <Route path="/mvs" component={Mvs} />
                            <Route path="/playlist/:id" component={Playlist} />
                            <Route path="/mv/:id" component={Mv} />
                            <Route path="/search/:keyword" component={Search} />
                            <Redirect exact from="/" to="/discovery" />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <div className="player">
                        <audio
                            ref={this.audioRef}
                            controls
                            autoPlay
                            src={this.state.url}
                            loop
                        ></audio>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Content;