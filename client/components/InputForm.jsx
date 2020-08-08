import React from 'react';
import '../styles/inputform.css'
export default class InputForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:'',toplist:[],show:false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    getURL(number) {
        return `http://localhost:3000/topn?number=${number}`;
    }
    render() {
        let tList = [];
        for(let tl=0;tl<this.state.toplist.length-1;tl=tl+2){
            tList.push(<tr key={tl}><td>{this.state.toplist[tl]}</td><td>{this.state.toplist[tl+1]}</td></tr>);
        }
        console.log(this.state.show);
        if(this.state.show){
            return (<div className="holder"><form onSubmit={this.handleSubmit}>
                    <input type="number" value={this.state.value} onChange={this.handleChange} placeholder="Enter A Number" name="inputnumber" id="inputnumber" />
                    <button type="submit">Submit</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <td>Words</td>
                            <td>Frequency</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tList}
                    </tbody>
                </table></div>
            )
        }else{
            return(<div  className="holder">
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" value={this.state.value} onChange={this.handleChange} placeholder="Enter A Number" name="inputnumber" id="inputnumber" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        }

        
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.value=='0'){
            return;
        }
        fetch(this.getURL(this.state.value)).then(res=>{
            if(res.status==200){
                return res.json();
            }
        }).then(data=>{
            console.log(data);
            this.setState({toplist:data,show:true});
            this.render();
        }).catch(err=>{
            console.log(err);
        });
    }
    handleChange(event){
        let inputStr = event.target.value;
        this.setState({value: event.target.value});
    }
}