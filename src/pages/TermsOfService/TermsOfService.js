import React from 'react';
import classes from '../PrivacyPage/Privacy.module.scss';

function TermsOfService() {
	React.useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);
	return (
		<section className={classes.privacy}>
			<header className={classes.header}>
				<h2>Terms of Privacy</h2>
				<p>Effective date: April 6, 2022; Last updated: April 6, 2022</p>
			</header>
			<p>
				The Quick Learner website and all its mobile versions
				<strong>Service</strong> is a hosted service operated by Quick Learner
				Inc. <strong>Quick Learner</strong>. Any use of the Service is subject
				to the following Terms and Conditions of Service{' '}
				<strong>Terms of Service</strong> or <strong>Terms</strong>, as well as
				to Quick Learner Privacy Policy, Quick Learner Community Guidelines, and
				Quick Learner Honor Code , all of which are incorporated by reference
				into these Terms of Service. Your use of the Service will constitute
				your acceptance of these Terms of Service.
			</p>
			<ol className={classes.list__container}>
				<li>
					<strong>Eligibility.</strong> Use of the Service is void where
					prohibited. The Service is intended for users over the age of 13, but
					is open to all ages. For children age 13 or younger (or other age of
					consent where required by local law), Quick Learner offers a
					restricted feature set and website experience that removes certain
					features. By using the Service, you represent and warrant that (a) all
					registration information you submit is truthful and accurate; (b) you
					will maintain the accuracy of such information; and (c) your use of
					the Service does not violate any applicable law or regulation.
				</li>
				<li>
					<strong>Your Quick Learner Account and Data.</strong> If you create an
					account on the Service, you are responsible for maintaining the
					security of your account and data, and you are fully responsible for
					all activities that occur under the account. Accounts are for
					individual, not organizational, use by a single person only. You may
					not share your account with any other person. You must notify Quick
					Learner immediately of any unauthorized uses of your data, your
					account or any other breaches of security. Quick Learner will not be
					liable for any acts or omissions by you, including any damages of any
					kind incurred as a result of such acts or omissions. Quick Learner may
					from time to time set storage limits for your data, or take any other
					measures it considers appropriate to manage the Service. Quick Learner
					may also from time to time change its policies on offering commercial
					content or displaying advertising, and may do this without notice.
				</li>
				<li>
					<strong>Upgraded Memberships.</strong> Users have the option to
					purchase additional features or functionality for their Quick Learner
					account <strong>Upgraded Membership</strong>. Upgraded Memberships may
					be purchased either by paying a recurring subscription fee; or
					pre-payment giving you access for a specific time period
					<strong>Pre-Paid Period</strong>. The terms stated below will govern
					your participation in these programs.
					<ol className={classes.indentOl}>
						<li>
							<strong>Pre-Paid Membership Term</strong>: Upgraded Memberships
							purchased for a Pre-Paid Period will automatically terminate at
							the end of the Pre-Paid Period.
						</li>
						<li>
							<strong>Group Orders</strong>:A Group Order provides credits
							towards multiple, individual Pre-Paid Period Upgraded Memberships
							via a unique upgrade link. The number of upgrade credits will be
							specified in the Group Order. Purchasers of Group Orders are
							solely responsible for the distribution of upgrade credits. All
							upgrades are non-transferable and irrevocable once a credit has
							been redeemed by an individual user account. Individual accounts
							which use a Group Order upgrade credit are not associated with any
							school, business, entity, institution or any other centralized
							account and the purchaser of the Group Order has no right to or
							interest in any account to which an upgrade credit has been
							applied, except where the purchaser of the Group Order and the
							holder of the account to which an upgrade credit has been applied
							are the same individual.
						</li>
						<li>
							<strong>Subscription Cancellation by You</strong>: If you have
							purchased a recurring Upgraded Membership subscription, you may
							end your Upgraded Membership at any time. When you choose to end
							your Upgraded Membership subscription, your subscription does not
							renew on the next auto-renewal date. You may continue to enjoy
							your Upgraded Membership benefits until that date, after which
							your account will be automatically downgraded.
						</li>
						<li>
							<strong>Cancellation by Us</strong>: We may cancel your Upgraded
							Membership at any time for any reason, with or without prior
							notice.
						</li>
						<li>
							<strong>Refunds</strong>: Except where required by law, Upgraded
							Memberships purchased directly through Quick Learner are
							non-refundable. Upgraded Memberships purchased through other
							platforms are subject to the refund policies of those platforms.
							Quick Learner cannot be held responsible for these platforms
							policies. We do not provide any refunds if the price for an
							Upgraded Membership drops, or if we offer subsequent promotional
							pricing or change the content or features of the Service.
						</li>
						<li>
							<strong>Price changes</strong>: Quick Learner may change the price
							for upgraded memberships from time to time. Quick Learner will
							communicate any price changes to you in advance and, if
							applicable, how to accept those changes. Price changes for
							Upgraded Memberships will take effect at the start of the next
							subscription period following the date of the price change. As
							permitted by local law, you accept the new price by continuing to
							maintain your Upgraded Membership after the price change takes
							effect. If you do not agree with the price changes, you have the
							right to reject the change by unsubscribing from the Upgraded
							Membership prior to the price change going into effect. Please
							therefore make sure you read any such notification of price
							changes carefully.
						</li>
					</ol>
				</li>

				<li>
					<strong>Disputes with Quick Learner.</strong> In the case of any
					dispute between you and Quick Learner arising out of or connected to
					these Terms of Service or your use of the Service, the following rules
					will apply.
					<strong>
						{' '}
						PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT
						YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT
						AND TO HAVE A JURY HEAR YOUR CLAIMS.
					</strong>
					<ol className={classes.indentOl}>
						<li>
							<strong>Binding Arbitration</strong>: Any dispute arising out of
							or relating to these Terms or your use of our Services will be
							settled through binding arbitration, conducted by the American
							Arbitration Association <strong>AAA</strong> and in accordance
							with their Commercial Arbitration Rules. Your responsibility to
							pay any filing, administrative, or arbitrator fees will be solely
							as set forth in the AAA rules. To the extent permitted under AAA
							rules, the arbitrator may award costs, fees, and expenses,
							including reasonable attorney’s fees, to the prevailing party. A
							decision reached by arbitration will be final and binding and may
							be entered as a judgment by any court having jurisdiction. You
							understand that there is no judge or jury in arbitration, and that
							other procedural rights such as discovery and appeal are not
							available in an arbitration.{' '}
							<strong>
								YOU AND Quick Learner KNOWINGLY AND VOLUNTARILY AGREE TO WAIVE
								YOUR RESPECTIVE RIGHTS TO A TRIAL BY JUDGE OR JURY AND TO HAVE
								YOUR CASE HEARD IN A COURT OF LAW
							</strong>
							.
						</li>
						<li>
							<strong>Disputes will be settled on an individual basis</strong>:{' '}
							<strong>
								{' '}
								YOU AND Quick Learner KNOWINGLY AND VOLUNTARILY AGREE TO WAIVE
								YOUR RESPECTIVE RIGHTS TO BRING OR PARTICIPATE IN A CLASS,
								COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION OR
								ARBITRATION
							</strong>
							. Notwithstanding this clause, each party may seek injunctive or
							other equitable relief in a court of competent jurisdiction in San
							Francisco County to protect the party’s intellectual property
							rights pending completion of the arbitration.
						</li>
					</ol>
				</li>
				<li>
					<strong>Venue.</strong> Any dispute subject to Binding Arbitration
					will take place in San Francisco County, California. For any other
					judicial action that may arise between you and Quick Learner, or for
					which our Binding Arbitration clause is found not to apply, both you
					and Quick Learner agree to submit to the venue and personal
					jurisdiction of the state and federal courts located in San Francisco
					County, California.
				</li>
				<li>
					<strong>Indemnification.</strong> You agree to defend, indemnify and
					hold harmless Quick Learner, its contractors, and its licensors, and
					their respective directors, officers, employees and agents from and
					against any and all claims and expenses, including attorneys fees,
					arising from your use of the Service, including but not limited to,
					any violation of any representation or warranty contained in these
					Terms of Service.
				</li>
				<li>
					<strong>Severability.</strong> If any part of these Terms of Service
					is held invalid or unenforceable, that part will be construed to
					reflect the drafter’s original intent, and the remaining portions will
					remain in full force and effect.
				</li>
				<li>
					<strong>Non-waiver of Rights.</strong> A waiver by either party of any
					term or condition of these Terms of Service or any breach thereof, in
					any one instance, will not waive such term or condition or any
					subsequent breach thereof.
				</li>
				<li>
					<strong>Assignment.</strong> You may assign your rights under these
					Terms of Service to any party that consents to, and agrees to be bound
					by, its terms. Quick Learner may assign its rights under these Terms
					of Service without condition. These Terms of Service will be binding
					upon and will inure to the benefit of the parties, their successors
					and permitted assigns.
				</li>
				<li>
					<strong>Survival of Terms.</strong> These Terms continue to apply,
					even after you close your account or cease using the Service.
				</li>
			</ol>
		</section>
	);
}

export default TermsOfService;
