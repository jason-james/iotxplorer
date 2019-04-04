import Component from "inferno-component";
import { Link } from "inferno-router";

export class StakingDashboardNav extends Component {
  render() {
    if (this.props.activeClass === "calculators") {
      return (
        <aside class='column is-2 mobile-spacing'>
          <nav class='menu'>
            <p class='menu-label'>General</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/dashboard/'>Dashboard</Link>
              </li>
              <li>
                <Link to='/staking/calculators/' className='is-active'>
                  Calculators
                </Link>
              </li>
            </ul>
            <p class='menu-label'>Voting/Staking</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/howto'>How To Vote</Link>
                <ul>
                  <li>Definitions</li>
                  <li>FAQ</li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      );
    } else if (this.props.activeClass === "how-to-vote") {
      return (
        <aside class='column is-2 mobile-spacing'>
          <nav class='menu'>
            <p class='menu-label'>General</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/dashboard/'>Dashboard</Link>
              </li>
              <li>
                <Link to='/staking/calculators/'>Calculators</Link>
              </li>
            </ul>
            <p class='menu-label'>Voting/Staking</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/howto' className='is-active'>
                  How To Vote
                </Link>
                <ul>
                  <li>Definitions</li>
                  <li>FAQ</li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      );
    } else if (this.props.activeClass === "dashboard") {
      return (
        <aside class='column is-2'>
          <nav class='menu'>
            <p class='menu-label'>General</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/dashboard/' className='is-active'>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/staking/calculators/'>Calculators</Link>
              </li>
            </ul>
            <p class='menu-label'>Voting/Staking</p>
            <ul class='menu-list'>
              <li>
                <Link to='/staking/howto'>How To Vote</Link>
                <ul>
                  <li>Definitions</li>
                  <li>FAQ</li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      );
    }
  }
}
