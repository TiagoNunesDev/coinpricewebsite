import React ,{Component} from 'react'
import axios from 'axios'
import news from './news.css'

const NEWS_API = 'https://cryptopanic.com/api/posts/?auth_token=fdb12eff58c0e949c16a1bb5601ca4fd94500507&public=true'

class News extends Component {
    constructor(){
        super();
        this.state = {
            news: null
        };
    }

    componentWillMount(){

        axios.get(NEWS_API)
            .then((item) => {
                console.log(Object.values(item.data.results));
                this.setState({news:Object.values(item.data.results)});
            }).catch(error => console.log(error))
    };


    addNews = () => {
        var self = this;
        var arr = [];
        self.state.news.map((item,idx) => {
            arr.push(
                <div className={news["news-table"]}>
                    <label>#{idx +1}</label>
                        <a href={item.url}>{item.title}</a>
                </div>
            );
        });

        return arr;
    };

    render(){
        return(
            <div>
                <div>
                    <label>LATEST CRYPTO NEWS</label>
                </div>
                {this.state.news ? this.addNews():null}
            </div>
        )
    }
}

export default News;