import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';
import Box from 'components/style/Box';
import { bp, color, fontSize } from 'lib/variables';

const EnvironmentTeaser = ({ environment, project }) => {
  const environmentLabel =
    environment.deployType === 'branch' ? environment.deployType : 'PR';

  let bgImages;
  switch (environment.deployType) {
    case 'branch':
      bgImages = {
        normal: "url('/static/images/environment-branch.svg')",
        hover: "url('/static/images/environment-branch-hover.svg')"
      };
      break;

    case 'pullrequest':
      bgImages = {
        normal: "url('/static/images/environment-pull-request.svg')",
        hover: "url('/static/images/environment-pull-request-hover.svg')"
      };
      break;

    default:
      bgImages = {
        normal: 'none',
        hover: 'none'
      };
  }

  const { className: boxClassName, styles: boxStyles } = css.resolve`
    .box {
      margin-bottom: 46px;

      .content {
        background-image: ${bgImages.normal};
        background-position: right 32px bottom -6px;
        background-repeat: no-repeat;
        background-size: 40px 50px;
        min-height: 122px;
        padding: 19px 20px;

        &:hover {
          background-image: ${bgImages.hover};
        }
      }
    }
  `;

  return (
    <>
      <Link
        href={{
          pathname: '/environment',
          query: { name: environment.openshiftProjectName }
        }}
      >
        <a>
          <Box className={boxClassName}>
            {environment.environmentType == 'production' && (
              <div className="productionLabel">
                <span>Production</span>
              </div>
            )}
            <label>{environmentLabel}</label>
            <h4>{environment.name}</h4>
          </Box>
        </a>
      </Link>
      <style jsx>{`
        a {
          width: 100%;

          @media ${bp.xs_smallUp} {
            margin-left: 48px;
            min-width: calc(50% - 24px);
            width: calc(50% - 24px);
          }
          @media ${bp.xs_small} {
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
          }
          @media ${bp.tabletUp} {
            margin-left: 0;
            min-width: 100%;
            width: 100%;
          }
          @media ${bp.desktopUp} {
            margin-left: 48px;
            min-width: calc(50% - 24px);
            width: calc(50% - 24px);
          }
          @media ${bp.desktop_extrawide} {
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
          }
          @media ${bp.extraWideUp} {
            min-width: calc((100% / 3) - 32px);
            width: calc((100% / 3) - 32px);
            &:nth-child(3n + 1) {
              margin-left: 0;
            }
          }
        }

        .productionLabel {
          color: ${color.green};
          ${fontSize(13)};
          position: absolute;
          right: -38px;
          text-transform: uppercase;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);

          &::after {
            border-top: 1px solid ${color.grey};
            content: '';
            display: block;
            position: relative;
            right: 12px;
            top: -12px;
            width: calc(100% + 26px);
            z-index: -1;
          }

          span {
            background-color: ${color.white};
            padding: 0 16px;
            z-index: 0;
          }
        }

        label {
          background-color: ${color.lightestGrey};
          border-bottom-right-radius: 20px;
          border-top-right-radius: 20px;
          margin-left: -20px;
          padding: 3px 20px 2px;
        }
      `}</style>
      {boxStyles}
    </>
  );
};

export default EnvironmentTeaser;
