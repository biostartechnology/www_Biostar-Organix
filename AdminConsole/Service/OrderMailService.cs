using CommonModel;
using CommonUtility;
using System;

namespace AdminConsole.Service
{
    public class OrderMailService
    {
        public static void SendOrderDelieveredMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Your Order has been delivered. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        public static void SendOrderAcceptedMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Your Order has been accepted. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS to check updates.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }


        public static void SendOrderCancelledMail(string orderId, UserModel user, string reason)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Your order has been cancelled for following reason {2}. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName, reason);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        public static void SendOrderReadyForPickUpMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Your order is ready fr pickup. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }


        public static void SendOrderShippedMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Your order is shipped. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        public static void SendOrderArtRequestedMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Please add your art work to start working on your order. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        public static void SendOrderArtApprovedMail(string orderId, UserModel user)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Please add your art work has been approved. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        public static void SendOrderArtRejectedMail(string orderId, UserModel user,string reason)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Please add your art work has been rejected for following reason {2}. Please visit <a href='Vector-NLS.nlshelp.com/orders'>Your Orders</a> on Vector-NLS.</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                html = string.Format(html, orderId, user.FirstName,reason);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }
    }
}
