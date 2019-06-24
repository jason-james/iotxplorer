import React, { Component } from "react";
import { Link } from "react-router";
export class StakingDashboardNav extends Component {
  render() {
    if (this.props.activeClass === "calculators") {
      return (
        <aside className='column is-2 mobile-spacing'>
          <nav className='menu'>
            <p className='menu-label'>General</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/dashboard/'>Dashboard</Link>
              </li>
              <li>
                <Link to='/staking/calculators/' className='is-active'>
                  Calculators
                </Link>
              </li>
            </ul>
            <p className='menu-label'>Voting/Staking</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/howto'>How To Vote</Link>
              </li>
            </ul>
          </nav>
        </aside>
      );
    } else if (this.props.activeClass === "how-to-vote") {
      return (
        <aside className='column is-2 mobile-spacing'>
          <nav className='menu'>
            <p className='menu-label'>General</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/dashboard/'>Dashboard</Link>
              </li>
              <li>
                <Link to='/staking/calculators/'>Calculators</Link>
              </li>
            </ul>
            <p className='menu-label'>Voting/Staking</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/howto' className='is-active'>
                  How To Vote
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      );
    } else if (this.props.activeClass === "dashboard") {
      return (
        <aside className='column is-2'>
          <nav className='menu'>
            <p className='menu-label'>General</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/dashboard/' className='is-active'>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/staking/calculators/'>Calculators</Link>
              </li>
            </ul>
            <p className='menu-label'>Voting/Staking</p>
            <ul className='menu-list'>
              <li>
                <Link to='/staking/howto'>How To Vote</Link>
              </li>
            </ul>
          </nav>
        </aside>
      );
    }
  }
}
