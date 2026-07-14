using System;

public class LoginFailedException :Exception 
{
    public LoginFailedException() : base ("Invalid Login ! Maximum attempts reached.")
    {
        
    }
}