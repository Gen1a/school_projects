using System.Runtime.Serialization;

namespace Covid19
{
    public enum Sex
    {
        [EnumMember(Value = "F")]   // Specifies that the field is an enumeration member and should be serialized
        Female,
        [EnumMember(Value ="M")]
        Male
    }
}