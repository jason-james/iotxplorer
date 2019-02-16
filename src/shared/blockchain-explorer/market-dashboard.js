import Component from 'inferno-component';
import {t} from '../../lib/iso-i18n';
import {ToolTip} from '../common/tooltip';


export class MarketDashboard extends Component {
  props: {
    stats: Array<any>,
  };

  render() {
    const stats = this.props.stats;
    const ss = [];
    let n = 0;
    if (stats.length % 2) {
      n = 1;
      ss.push([stats[0]]);
    }
    while (n < stats.length) {
      ss.push([stats[n], stats[n + 1]]);
      n += 2;
    }
    return (
      <div className='column dashboard-wrap'>
        {
          ss.map(row => {
            return (
              <div className='tile is-ancestor'>
                {row.map(s => (
                  <div className='tile is-parent'>
                    <article className='tile is-child box box-custom'>
                      <div style={{display:'flex', justifyContent:'center'}}>
                        <p className='subtitle dashboard-title' style={{color: '#4c4c4c'}}>{s.title}</p>
                        <ToolTip
                          iconClass={s.icon}
                          message={t(s.msg)}
                          customPadClass={'dashboard-tooltip'}
                        />
                      </div>
                      <p className='title has-text-centered' style={{display:'flex', justifyContent:'center'}}>{s.subtitle}</p>
                    </article>
                  </div>
                ))}
              </div>
            );
          })
        }
      </div>
    );
  }
}
